import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {User} from '../models';
import {MlabDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(
    @inject('datasources.mlab') dataSource: MlabDataSource,
  ) {
    super(User, dataSource);
  }
}
