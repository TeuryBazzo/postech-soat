import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinTable } from 'typeorm';
import { CreateProductDTO } from './dto/createproduct.dto';
import { UpdateProductDTO } from './dto/updateproduct.dto';
import { ItemCart } from 'src/cart/cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @OneToMany(type => ItemCart, itemCart => itemCart.cart)
  @JoinTable()
  itemCart: ItemCart[]

  static newProductByCreate(createProductDto: CreateProductDTO) {
    let product = new Product()
    product.code = createProductDto.code
    product.category = createProductDto.category
    product.description = createProductDto.description
    product.price = createProductDto.price
    return product
  }

  static newProductByUpdate(id: string, updateProductDto: UpdateProductDTO) {
    let product = new Product()
    product.id = +id
    product.code = updateProductDto.code
    product.category = updateProductDto.category
    product.price = updateProductDto.price
    product.description = updateProductDto.description
    return product
  }
}