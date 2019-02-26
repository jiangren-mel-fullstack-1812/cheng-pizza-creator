import { Entity, model, property } from '@loopback/repository';
import { OrderItem } from '../models/order-item.model';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property.array(OrderItem, {
    name: 'orderItems'
  })
  orderItems: OrderItem[];

  @property({
    type: 'string',
  })
  status?: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }

}
