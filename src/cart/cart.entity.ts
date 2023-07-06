import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, JoinTable } from 'typeorm';

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => ItemCart, itemCart => itemCart.cart, {
    cascade: true,
  })
  @JoinTable()
  itens: ItemCart[];


}


@Entity()
export class ItemCart {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.itens)
  cart: Cart;

  @ManyToOne(() => Product, (cart) => cart.itemCart,
  {
    cascade: true,
  })
  product: Product;

  @Column()
  count: number;

  @Column()
  observation: string;

}