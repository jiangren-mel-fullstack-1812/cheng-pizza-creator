/* tslint:disable:no-any */
import { Entity, model, property } from '@loopback/repository';
import { Topping } from './topping.model';

/**
 * The model class is generated from OpenAPI schema - Order
 * Order
 */
@model({ name: 'Order' })
export class Order extends Entity {
  constructor(data?: Partial<Order>) {
    super();
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ name: 'id' })
  id?: string;

  /**
   *
   */
  @property({ name: 'customer', required: true })
  customer: {

  };

  /**
   *
   */
  @property.array(Topping, { name: 'toppings' })
  toppings: Topping[];

  /**
   *
   */
  @property({ name: 'status' })
  status?: string;

}

