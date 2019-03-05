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
  HttpErrors
} from '@loopback/rest';
import { Order, Product, OrderCreation } from '../models';
import { OrderRepository, ProductRepository, UserRepository } from '../repositories';

export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
    @repository(ProductRepository)
    public productRepository: ProductRepository,
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

  @post('/orders', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Order } } },
      },
    },
  })
  async create(@requestBody() orderRequest: OrderCreation): Promise<Order> {
    // get product by orderitem.productId
    // set product.name to orderItem.productName;
    let newOrder = new Order();

    let customer = await this.userRepository.findById(orderRequest.userName);
    if (!customer) {
      throw new HttpErrors.BadRequest("customer not found");
    }
    newOrder.userName = orderRequest.userName;
    newOrder.orderItems = Object.assign([], orderRequest.orderItems);
    for (let orderItem of newOrder.orderItems) {
      let foundProduct = await this.productRepository.findById(orderItem.productId);
      orderItem.productName = foundProduct.name;
      orderItem.price = foundProduct.price;
    }
    newOrder.status = "ordered";
    return this.orderRepository.create(newOrder);
  }


  @get('/orders', {
    responses: {
      '200': {
        description: 'Array of Order model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Order } },
          },
        },
      },
    },
  })
  async find(
    @param.query.string('filter') filter?: Filter,
  ): Promise<Order[]> {
    console.log(`find by customer id: ${filter}`);
    return await this.orderRepository.find(filter);
  }

  @get('/orders/{id}', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Order } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Order> {
    return await this.orderRepository.findById(id);
  }

  @patch('/orders/{id}', {
    responses: {
      '204': {
        description: 'Order PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() order: Order,
  ): Promise<void> {
    await this.orderRepository.updateById(id, order);
  }

}
