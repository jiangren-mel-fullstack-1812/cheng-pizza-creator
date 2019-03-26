import { getService, juggler } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { Payment } from '../models';
import { PaymentDataSource } from '../datasources';

export interface PaymentService {
  pay(payment: Payment): Promise<void>;
}

export class PaymentServiceProvider implements Provider<PaymentService> {
  constructor(
    @inject('datasources.payment')
    protected dataSource: juggler.DataSource = new PaymentDataSource(),
  ) { }

  value(): Promise<PaymentService> {
    return getService(this.dataSource);
  }
}
