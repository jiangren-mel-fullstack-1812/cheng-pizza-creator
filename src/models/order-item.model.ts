import {Model, model, property} from '@loopback/repository';

@model()
export class OrderItem extends Model {
  @property({
    type: 'string',
    required: true,
  })
  toppingId: string;

  @property({
    type: 'string',
  })
  toppingName?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;


  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}
