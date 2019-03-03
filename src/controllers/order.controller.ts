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
import { Order, Product } from '../models';
import { OrderRepository, ProductRepository } from '../repositories';

export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
    @repository(ProductRepository)
    public productRepository: ProductRepository
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
    // get product by orderitem.productId
    // set product.name to orderItem.productName;
    console.log("1111111111111111");
    console.log(order);
    for (let orderItem of order.orderItems) {
      let foundProduct = await this.productRepository.findById(orderItem.productId);
      orderItem.productName = foundProduct.name;
      orderItem.price = foundProduct.price;
      console.log("22222222222222");
    }

    console.log("3333333333333333");
    console.log(order);

    console.log("444444444444444");
    console.log(order);
    return this.orderRepository.create(order);
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
