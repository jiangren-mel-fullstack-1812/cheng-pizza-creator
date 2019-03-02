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
} from '@loopback/rest';
import { Order } from '../models';
import { OrderRepository, ToppingRepository } from '../repositories';

export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
    @repository(ToppingRepository)
    public toppingRepository: ToppingRepository
  ) { }

  @post('/orders', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Order } } },
      },
    },
  })
  async create(@requestBody() order: Order): Promise<Order> {
    // get topping by orderitem.toppingId
    // set topping.name to orderItem.toppingName;
    for (let orderItem of order.orderItems) {
      this.toppingRepository.findById(orderItem.toppingId).then((aTopping) => {
        orderItem.toppingName = aTopping.name;
        orderItem.price = aTopping.price;
      });

    }

    return await this.orderRepository.create(order);
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
    @param.query.object('filter', getFilterSchemaFor(Order)) filter?: Filter,
  ): Promise<Order[]> {
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
