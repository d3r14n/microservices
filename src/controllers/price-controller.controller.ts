import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Price} from '../models';
import {PriceRepository} from '../repositories';


const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

export class PriceControllerController {
  constructor(
    @repository(PriceRepository)
    public priceRepository : PriceRepository,
  ) {}

  @post('/prices')
  @response(200, {
    description: 'Price model instance',
    content: {'application/json': {schema: getModelSchemaRef(Price)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {
            title: 'NewPrice',
            exclude: ['id'],
          }),
        },
      },
    })
    price: Omit<Price, 'id'>,
  ): Promise<Price> {
    return this.priceRepository.create(price);
  }

  @get('/prices/count')
  @response(200, {
    description: 'Price model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Price) where?: Where<Price>,
  ): Promise<Count> {
    return this.priceRepository.count(where);
  }

  @get('/prices')
  @response(200, {
    description: 'Array of Price model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Price, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Price) filter?: Filter<Price>,
  ): Promise<Price[]> {
    return this.priceRepository.find(filter);
  }

  @patch('/prices')
  @response(200, {
    description: 'Price PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {partial: true}),
        },
      },
    })
    price: Price,
    @param.where(Price) where?: Where<Price>,
  ): Promise<Count> {
    return this.priceRepository.updateAll(price, where);
  }

  @get('/prices/{id}')
  @response(200, {
    description: 'Price model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Price, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Price, {exclude: 'where'}) filter?: FilterExcludingWhere<Price>
  ): Promise<Price> {
    return this.priceRepository.findById(id, filter);
  }

  @patch('/prices/{id}')
  @response(204, {
    description: 'Price PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {partial: true}),
        },
      },
    })
    price: Price,
  ): Promise<void> {
    await this.priceRepository.updateById(id, price);
  }

  @put('/prices/{id}')
  @response(204, {
    description: 'Price PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() price: Price,
  ): Promise<void> {
    await this.priceRepository.replaceById(id, price);
  }

  @del('/prices/{id}')
  @response(204, {
    description: 'Price DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.priceRepository.deleteById(id);
  }

  /*precioTotal(costo: number, descuento: number, zona: number, envio: number)
  {
    let costoTotal = (costo - descuento);
    switch(zona)
    {
      case 1:
        costoTotal += (costoTotal * 0.16) + (costoTotal * 0.08)
        break;

      case 2:
        costoTotal += (costoTotal * 0.17) + (costoTotal * 0.15)
        break;

      case 3:
        costoTotal += (costoTotal * 0.15) + (costoTotal * 0.2)
        break;

      case 4:
        costoTotal += (costoTotal * 0.12) + (costoTotal * 0.06)
        break;

      case 5:
        costoTotal += (costoTotal * 0.1) + (costoTotal * 0.05)
        break;
    }

    costoTotal += envio;

    return costoTotal;
  }*/

  @get('prices/sendCP')
  async sendCP(@param.path.number('cp') cp : number) : Promise<number>
  {
    return cp;
  }

  @get('prices/sendMethod')
  async sendMethod(@param.path.string('method') method : string) : Promise<string>
  {
    return method.toLowerCase();
  }

  @get('prices/sendCoupon')
  async sendCoupon(@param.path.string('coupon') coupon : string) : Promise<string>
  {
    return coupon.toUpperCase();
  }

  @get('/prices/total')
  async precioTotal(
    @param.path.number('costo') costo : number,
    @param.path.number('descuento') descuento : number,
    @param.path.number('zona') zona : number,
    @param.path.number('envio') envio : number
  ): Promise<number> {
    let costoTotal = (costo - descuento);
    switch(zona)
    {
      case 1:
        costoTotal += (costoTotal * 0.16) + (costoTotal * 0.08)
        break;

      case 2:
        costoTotal += (costoTotal * 0.17) + (costoTotal * 0.15)
        break;

      case 3:
        costoTotal += (costoTotal * 0.15) + (costoTotal * 0.2)
        break;

      case 4:
        costoTotal += (costoTotal * 0.12) + (costoTotal * 0.06)
        break;

      case 5:
        costoTotal += (costoTotal * 0.1) + (costoTotal * 0.05)
        break;
    }

    costoTotal += envio;

    return costoTotal;
  }

  @get('/error')
  async error():Promise<void>
  {
    const transaction = Sentry.startTransaction({
      op: "test",
      name: "My First Test Transaction",
    });

    setTimeout(() => {
      try {
        //foo();
      } catch (e) {
        Sentry.captureException(e);
      } finally {
        transaction.finish();
      }
    }, 99);
  }
}
