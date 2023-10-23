import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Order } from "src/order/order.entity";
import { ClientController } from "./client.controller";
import { DataSource } from "typeorm";
import { ClientRepository } from "./client.repository";
import { CreateClientuseCase } from "./useCases/createClient.useCase";
import { GetClientByCpfuseCase } from "./useCases/getClientByCpf.useCase";
import { ReponseHttpHelper } from "src/presentation/helpers/excption.http.helper";
import { IsUniqueCpfuseCase } from "./useCases/isUniqueCpf.useCase";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        TypeOrmModule.forFeature([Client, Order]),
        HttpModule
    ],
    controllers: [ClientController],
    providers: [
        ReponseHttpHelper,
        ClientRepository,
        IsUniqueCpfuseCase,
        GetClientByCpfuseCase,
        CreateClientuseCase,
    ],
    exports : [
        GetClientByCpfuseCase
    ]
})
export class ClientModule {
    constructor() { }
}
