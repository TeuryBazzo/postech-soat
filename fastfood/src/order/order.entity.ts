import { Client } from 'src/client/client.entity';
import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  // @Column()
  // client: Client;

  // @Column()
  // products: Array<Product>;

  @Column()
  totalPrice: number;

  @Column()
  dateTime: string;

  @Column()
  status: string;

  @Column()
  obs: string;
}