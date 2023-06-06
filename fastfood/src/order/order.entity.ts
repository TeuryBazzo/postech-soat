import { Cart } from 'src/cart/cart.entity';
import { Client } from 'src/client/client.entity';
import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cart, {
    cascade: true
  })
  @JoinColumn()
  cart: Cart;

  @Column()
  dateTime: string;

  @Column()
  status: string;

  @Column({
    nullable: true
  })
  observation: string;

  totalPrice: number;
}