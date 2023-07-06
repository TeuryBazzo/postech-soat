import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, JoinTable } from 'typeorm';

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @OneToMany(type => ItemCart, itemCart => itemCart.cart, {
    cascade: true,
  })
  @JoinTable()
  @ApiProperty({ 
    isArray: true,
    type: 'array' 
  })
  itens: ItemCart[];


}


@Entity()
export class ItemCart {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.itens)
  cart: Cart;

  @ManyToOne(() => Product, (cart) => cart.itemCart,
  {
    cascade: true,
  })
  @ApiProperty()
  product: Product;

  @Column()
  @ApiProperty()
  count: number;

  @Column()
  @ApiProperty()
  observation: string;

}