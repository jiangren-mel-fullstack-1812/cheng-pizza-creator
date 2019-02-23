/* tslint:disable:no-any */
import {operation, param, requestBody} from '@loopback/rest';
import {Order} from '../models/order.model';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by OrderController
 * 
 */
export class OrderController {
  constructor() {}

  /**
   * 
   * 

   * @param where 
   * @returns Order model count
   */
  @operation('get', '/orders/count')
  async count(@param({name: 'where', in: 'query'}) where: {
  
}): Promise<{
  count?: number;
}> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param requestBody 
   * @param id 
   */
  @operation('put', '/orders/{id}')
  async replaceById(@requestBody() requestBody: Order, @param({name: 'id', in: 'path'}) id: number): Promise<any> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param requestBody 
   * @param id 
   */
  @operation('patch', '/orders/{id}')
  async updateById(@requestBody() requestBody: Order, @param({name: 'id', in: 'path'}) id: number): Promise<any> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param id 
   * @returns Order model instance
   */
  @operation('get', '/orders/{id}')
  async findById(@param({name: 'id', in: 'path'}) id: number): Promise<Order> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param id 
   */
  @operation('delete', '/orders/{id}')
  async deleteById(@param({name: 'id', in: 'path'}) id: number): Promise<any> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param requestBody 
   * @returns Order model instance
   */
  @operation('post', '/orders')
  async create(@requestBody() requestBody: Order): Promise<Order> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param requestBody 
   * @param where 
   * @returns Order PATCH success count
   */
  @operation('patch', '/orders')
  async updateAll(@requestBody() requestBody: Order, @param({name: 'where', in: 'query'}) where: {
  
}): Promise<{
  count?: number;
}> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param filter 
   * @returns Array of Order model instances
   */
  @operation('get', '/orders')
  async find(@param({name: 'filter', in: 'query'}) filter: {
  where?: {
  
};
  fields?: {
  id?: boolean;
  customer?: boolean;
  toppings?: boolean;
  status?: boolean;
};
  offset?: number;
  limit?: number;
  skip?: number;
  order?: string[];
}): Promise<Order[]> {
    throw new Error('Not implemented');
  }

}

