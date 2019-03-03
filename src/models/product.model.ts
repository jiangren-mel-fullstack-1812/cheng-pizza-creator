/* tslint:disable:no-any */
import { Entity, model, property } from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Product
 * Product
 */
@model({ name: 'Product' })
export class Product extends Entity {
  constructor(data?: Partial<Product>) {
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

