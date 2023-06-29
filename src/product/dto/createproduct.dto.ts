import { IsNotEmpty } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    category: string;
}