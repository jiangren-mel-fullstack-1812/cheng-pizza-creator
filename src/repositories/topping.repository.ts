import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Topping } from '../models/topping.model';
import { MlabDataSource } from '../datasources/mlab.datasource';
import { inject } from '@loopback/core';

export class ToppingRepository extends DefaultCrudRepository<
  Topping,
  typeof Topping.prototype.id
  > {
  constructor(
    @inject('datasources.mlab') dataSource: MlabDataSource,
  ) {
    super(Topping, dataSource);
  }
}
