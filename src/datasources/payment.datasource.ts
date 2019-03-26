import { inject } from '@loopback/core';
import { juggler, AnyObject } from '@loopback/repository';
import * as config from './payment.datasource.json';

export class PaymentDataSource extends juggler.DataSource {
  static dataSourceName = 'payment';

  constructor(
    @inject('datasources.config.payment', { optional: true })
    dsConfig: AnyObject = config,
  ) {
    dsConfig = Object.assign({}, dsConfig, {
      // A workaround for the current design flaw where inside our monorepo,
      //   packages/service-proxy/node_modules/loopback-datasource-juggler
      // cannot see/load the connector from
      //   examples/todo/node_modules/loopback-connector-rest
      connector: require('loopback-connector-rest'),
    });
    super(dsConfig);
  }
}
