import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Order } from "src/order/order.entity";
import { ClientController } from "./client.controller";
import { DataSource } from "typeorm";
import { ClientRepository } from "./client.repository";
import { CreateClientUserCase } from "./userCases/createClient.userCase";
import { GetClientByCpfUserCase } from "./userCases/getClientByCpf.userCase";
import { IsUniqueCpfUserCase } from "./userCases/isUniqueCpf.userCase";
import { IsUniqueCpf } from "./validations/isuniquecpf.validation";

@Module({
    imports: [
        TypeOrmModule.forFeature([Client, Order])
    ],
    controllers: [ClientController],
    providers: [
        IsUniqueCpf,
        ClientRepository,
        GetClientByCpfUserCase,
        CreateClientUserCase,
        IsUniqueCpfUserCase
    ],
})
export class ClientModule {
    constructor() { }
}
