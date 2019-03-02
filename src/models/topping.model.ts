/* tslint:disable:no-any */
import { Entity, model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Topping
 * Topping
 */
@model({ name: 'Topping' })
export class Topping extends Entity {
  constructor(data?: Partial<Topping>) {
    super();
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({ name: 'id', id: true })
  id?: string;

  /**
   *
   */
  @property({ name: 'name', required: true })
  name: string;

  /**
   *
   */
  @property({ name: 'price' })
  price: number;


  @property({ name: 'type' })
  type?: string;


}

