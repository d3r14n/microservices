import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'servicec',
  connector: 'rest',
  baseURL: 'https://servicec.com',
  crud: true,
  options: {
    headers: {
      accept: 'application/json',
      "content-type": 'application/json'
    }
  },
  operations: [
    {
      template: {
        method: "POST",
        url: "https://servicec.com/getEnvio",
        form: {
          "orderId": "^{orderId}",
          "amount": "^{amount}",
        }
      },
      functions: {
        createOrder: ["amount", "orderId"]
      }
    }
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ServicecDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'servicec';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.servicec', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
