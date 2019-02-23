import { Entity, model, property } from '@loopback/repository';
import { Topping } from '../models/topping.model';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  toppings: Topping[];

  @property({
    type: 'string',
  })
  status?: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}
