import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../order.repository";
import { Order } from "../order.entity";
import { CreateOrderDTO } from "../dto/createorder.dto";
import { GetClientByCpfUserCase } from "src/client/userCases/getClientByCpf.userCase";
import { GetProductsByCodeUserCase } from "src/product/userCases/getProductsByCode.userCase";
import { ItemCart } from "src/cart/cart.entity";
import { Client } from "src/client/client.entity";

@Injectable()
export class CreateOrderUserCase {

    constructor(
        private orderRepository: OrderRepository,
        private getClientByCpfUserCase: GetClientByCpfUserCase,
        private getProductsByCodeUserCase: GetProductsByCodeUserCase
    ) { }


    async handle(orderDto: CreateOrderDTO): Promise<Order> {

        var order = new Order();
        order.observation = orderDto.observation;
        order.cart = orderDto.cart;
        order.client = orderDto.client;
        order.dateTime = Date.now().toString()
    
        order.cart.itens = await this.getExistentProducts(orderDto.cart.itens);
        order.client = await this.getExistentClient(orderDto.client);
    
        return await this.orderRepository.save(order);
      }



      private async getExistentProducts(itensCard: ItemCart[]): Promise<ItemCart[]> {
        for (const itemCart of itensCard) {
    
          var product = await this.getProductsByCodeUserCase.handle(itemCart.product.code);
    
          if (product) {
            itemCart.product = product;
          }
        }
    
        return itensCard;
      }
    
      private async getExistentClient(client: Client) {
    
        var clientExist = await this.getClientByCpfUserCase.handle(client.cpf);
    
        if (clientExist)
          client = clientExist
    
        return client;
    
      }

}