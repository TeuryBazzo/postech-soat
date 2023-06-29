import { Cart } from 'src/cart/cart.entity';
import { Client } from 'src/client/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

export enum StatusOrder {
  RECEBIDO = 1,
  EM_PREPARACAO = 2,
  PRONTO = 3,
  FINALIZADO = 4,
}

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cart, { cascade: true })
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Client, (client) => client.orders, {
    cascade: true
  })
  client: Client;

  @Column({type: 'bigint'})
  dateTime: string;

  @Column({
    type: "enum",
    enum: StatusOrder,
    default: StatusOrder.RECEBIDO,
})
  status: StatusOrder;

  @Column({
    nullable: true
  })
  observation: string;

  totalPrice: number;
}