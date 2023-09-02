import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, JoinTable } from 'typeorm';
import { ItemCart } from './itemCart.entity';

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
    type: ItemCart,
    isArray: true
  })
  itens: ItemCart[];


}

