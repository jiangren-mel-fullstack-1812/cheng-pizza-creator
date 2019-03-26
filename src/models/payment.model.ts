import { Entity, model, property } from '@loopback/repository';
import { UserRef } from '.';

@model()
export class Payment extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    required: true,
  })
  user: UserRef;

  @property({
    type: 'string',
  })
  orderId?: string;

  @property({
    type: 'string',
    required: true,
  })
  CardNo: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'date',
  })
  created?: string;


  constructor(data?: Partial<Payment>) {
    super(data);
  }
}
