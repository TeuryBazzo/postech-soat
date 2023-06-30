import { IsInt, IsNotEmpty, IsNumber, Matches, Max, Min } from "class-validator";
import { Cart } from "src/cart/cart.entity";
import { Client } from "src/client/client.entity";

export class CreateOrderDTO {

    @IsNotEmpty()
    cart: Cart;
  
    @IsNotEmpty()
    client: Client;
  
    observation: string;
  
    totalPrice: number;
}