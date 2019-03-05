import { model, property, Model } from '@loopback/repository';
import { OrderItem } from '../models';

@model()
export class OrderCreation extends Model {
  @property({
    type: 'string',
    id: true,
  })
  userName: string;

  @property.array(OrderItem, {
    name: 'orderItems'
  })
  orderItems: OrderItem[];


  constructor(data?: Partial<OrderCreation>) {
    super(data);
  }

}
