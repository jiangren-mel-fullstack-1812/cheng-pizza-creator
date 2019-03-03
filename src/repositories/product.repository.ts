import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Product } from '../models/product.model';
import { MlabDataSource } from '../datasources/mlab.datasource';
import { inject } from '@loopback/core';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id
  > {
  constructor(
    @inject('datasources.mlab') dataSource: MlabDataSource,
  ) {
    super(Product, dataSource);
  }
}
