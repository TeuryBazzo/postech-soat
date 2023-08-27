import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepository } from "../order.repository";

@Injectable()
export class GetOrderByIdUserCase {

    constructor(
        private orderRepository: OrderRepository
    ) { }


    async handle(orderId: number){
        var storedOrder = await this.orderRepository.getById(orderId)
        
        if (!storedOrder) 
          throw new NotFoundException();
    
        return storedOrder;
      }

}