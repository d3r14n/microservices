import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'serviceb',
  connector: 'rest',
  baseURL: 'https://microservicio-promociones.herokuapp.com/explorer',
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
        method: "GET",
        url: "https://microservicio-promociones.herokuapp.com/explorer/getState/{postalcode}"
      },
      functions: {
        getState: ["postalcode"]
      }
    },
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ServicebDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'serviceb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.serviceb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
