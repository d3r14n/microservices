import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  method: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  zone: number;

  @property({
    type: 'number',
    required: true,
  })
  productPrice: number;

  @property({
    type: 'number',
    default: 0,
  })
  discount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  shipping?: number;

  @property({
    type: 'number',
    default: 0,
  })
  iva?: number;

  @property({
    type: 'number',
    default: 0,
  })
  commission?: number;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
