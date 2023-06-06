import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => ItemCart, itemCart => itemCart.cart, {
    cascade: true
  })
  itens: ItemCart[];


}


@Entity()
export class ItemCart {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.itens)
  cart: Cart;

  @OneToOne(() => Product, {
    cascade: true
  })
  @JoinColumn()
  product: Product;

  @Column()
  count: number;

  @Column()
  observation: string;

}