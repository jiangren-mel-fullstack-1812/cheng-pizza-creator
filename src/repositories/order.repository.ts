import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Order } from '../models/order.model';
import { MlabDataSource } from '../datasources/mlab.datasource';
import { inject } from '@loopback/core';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id
  > {
  constructor(
    @inject('datasources.mlab') dataSource: MlabDataSource,
  ) {
    super(Order, dataSource);
  }
}
