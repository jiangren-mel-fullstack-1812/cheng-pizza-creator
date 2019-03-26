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
import { Order, Product, OrderCreation, Payment, UserRef } from '../models';
import { OrderRepository, ProductRepository, UserRepository } from '../repositories';
import { PaymentService, GeocoderService } from '../services';
import { BankAccount } from '../models/bank-account.model';
import { inject } from '@loopback/core';

export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
    @repository(ProductRepository)
    public productRepository: ProductRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('services.GeocoderService')
    protected geoService: GeocoderService,
    @inject('services.PaymentService')
    public paymentProvider: PaymentService
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

  @post('/orders/{id}/pay', {
    responses: {
      '204': {
        description: 'Order paid success',
      },
    },
  })
  async pay(
    @param.path.string('id') id: string,
    @requestBody() bankAccount: BankAccount,
  ): Promise<void> {
    let order = await this.orderRepository.findById(id);
    let customer = await this.userRepository.findById(order.userName);
    if (!customer) {
      throw new HttpErrors.BadRequest("customer not found");
    }
    let request = new Payment();
    let customerRef = new UserRef();
    customerRef.id = customer.id;
    customerRef.type = customer.type;
    request.user = customerRef;
    request.CardNo = bankAccount.acc;
    request.orderId = id;
    console.log(this.geoService);
    let code = await this.geoService.geocode("asdfwefeawf");
    console.log(`code is ${code}`);
    console.log(`payment is ${this.paymentProvider}`);
    return await this.paymentProvider.pay(request);
  }

}
