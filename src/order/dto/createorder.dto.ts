import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, Matches, Max, Min } from "class-validator";
import { Cart } from "src/cart/cart.entity";
import { Client } from "src/client/client.entity";

export class CreateOrderDTO {

    @IsNotEmpty()
    @ApiProperty()
    cart: Cart;
  
    @IsNotEmpty()
    @ApiProperty()
    client: Client;
  
    @ApiProperty()
    observation: string;
  
    @ApiProperty()
    totalPrice: number;
}