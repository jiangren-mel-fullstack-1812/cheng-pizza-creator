import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { User, LoginRequest, LoginResponse, Order } from '../models';
import { UserRepository, OrderRepository } from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(OrderRepository)
    public orderRepository: OrderRepository
  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    let existingUser = await this.userRepository.findOne({ where: { name: user.name } });
    if (existingUser) {
      throw new HttpErrors.BadRequest(`user name: ${user.name} existed`);
    }
    return await this.userRepository.create(user);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'return user id',
        content: { 'application/json': { schema: { 'x-ts-type': LoginResponse } } },
      },
    },
  })
  async login(@requestBody() user: LoginRequest): Promise<LoginResponse> {
    return this.userRepository.findOne({ where: { name: user.username, password: user.password } }).then(foundUser => {
      if (!foundUser) {
        throw new HttpErrors[401](`login failed`);
      }
      let response = new LoginResponse();
      response.userId = foundUser.getId();
      return response;
    });
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': User } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @get('/users/{name}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async findById(@param.path.string('name') name: string): Promise<User> {
    let foundUser = await this.userRepository.findOne({ where: { name: name } });
    if (!foundUser) {
      throw new HttpErrors.NotFound();
    }
    return foundUser;
  }

  @get('/users/{name}/orders', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': [] } } },
      },
    },
  })
  async findOrdersById(@param.path.string('name') name: string): Promise<Order[]> {
    return await this.orderRepository.find({ where: { userName: name } });
  }

  @del('/users/{name}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('name') name: string): Promise<void> {
    let foundUser = await this.userRepository.findOne({ where: { name: name } });
    if (!foundUser) {
      throw new HttpErrors.NotFound(`user name ${name} not exist`);
    }
    await this.userRepository.delete(foundUser);
  }
}
