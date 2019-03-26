import {Model, model, property} from '@loopback/repository';

@model()
export class UserRef extends Model {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  type?: string;


  constructor(data?: Partial<UserRef>) {
    super(data);
  }
}
