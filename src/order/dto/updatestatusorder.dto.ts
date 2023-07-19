import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateStatusOrderDTO {
    @ApiProperty()
    @IsString()
    status: number;
}