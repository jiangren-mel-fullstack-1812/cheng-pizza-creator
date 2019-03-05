import { Entity, model, property } from '@loopback/repository';
import { Order } from '../models';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
