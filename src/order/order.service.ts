import { ItemCart } from './../cart/cart.entity';
import { Injectable } from '@nestjs/common';
import { Order, StatusOrder } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dto/createorder.dto';
import { Product } from 'src/product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  getAll(status: string): Promise<Order[]> {
    if (!status) {
      return this.ordersRepository.find();
    }
    return this.ordersRepository.find({where:{status: +status}, order:{dateTime: "ASC"}});
  }

  async save(orderDto: CreateOrderDTO): Promise<Order> {


    // for (const itemCart of orderDto.cart.itens) {

    //   var product = await this.productRepository.findOne({ where: { code: itemCart.product.code } });
     
    //   if (product) {
    //     itemCart.product.id = product.id;
    //   }
    // }

    var order = new Order();
    order.observation = orderDto.observation;
    order.cart = orderDto.cart;
    order.client = orderDto.client;
    order.dateTime = Date.now().toString()

    return await this.ordersRepository.save(order);
  }
}
