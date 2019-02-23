/* tslint:disable:no-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Customer
 * Customer
 */
@model({name: 'Customer'})
export class Customer {
  constructor(data?: Partial<Customer>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * 
   */
  @property({name: 'id'})
  id?: string;

  /**
   * 
   */
  @property({name: 'name', required: true})
  name: string;

  /**
   * 
   */
  @property({name: 'contact'})
  contact?: string;

}

