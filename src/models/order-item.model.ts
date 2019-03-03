import { Model, model, property } from '@loopback/repository';

@model()
export class OrderItem extends Model {
  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'string',
  })
  productName?: string;

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
