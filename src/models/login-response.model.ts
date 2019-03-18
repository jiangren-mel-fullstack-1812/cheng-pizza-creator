import { Model, model, property } from '@loopback/repository';

@model()
export class LoginResponse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  userId: string;


  constructor(data?: Partial<LoginResponse>) {
    super(data);
  }
}
