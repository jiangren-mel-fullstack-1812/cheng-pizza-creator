import {Model, model, property} from '@loopback/repository';

@model()
export class BankAccount extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  bsb: string;

  @property({
    type: 'string',
    required: true,
  })
  acc: string;


  constructor(data?: Partial<BankAccount>) {
    super(data);
  }
}
