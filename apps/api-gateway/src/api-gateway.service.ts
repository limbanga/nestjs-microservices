import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
  constructor(
    // @Inject('PRODUCT_SERVICE') private client: ClientProxy
  ) { }

  
}
