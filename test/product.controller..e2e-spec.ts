import { HttpStatus } from "@nestjs/common";
import { CreateProductDTO } from "src/product/dto/createproduct.dto";
import { ResponseDTO } from "src/product/dto/response.dto";
import * as request from "supertest";

describe("Product", () => {
    const productUrl = `http://localhost:3000/api/v1/products`;
      describe("send post containg a valid product", () => {
      let productId: number;
      it("create product successfully", () => {
        const mockProduct: CreateProductDTO = {
          category: 'LANCHE',
          code: 'CODE1',
          description: 'X-burger',
          price: 10
        }     
        return request(productUrl)
          .post('')
          .set("Accept", "application/json")
          .send(mockProduct)
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body;
            productId = data.id
            expect(status).toEqual(HttpStatus.CREATED),
            expect(message).toEqual('product was created successfully'),
            expect(data.code).toEqual('CODE1'),
            expect(data.description).toEqual('X-burger'),
            expect(data.price).toEqual(10),
            expect(data.category).toEqual('LANCHE');
          })
          .expect(HttpStatus.CREATED)
      })
      it("get one product in list", () => {    
        return request(productUrl)
          .get('')
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(HttpStatus.OK),
            expect(message).toEqual(''),
            expect(data.length).toEqual(1),
            expect(data[0].code).toEqual('CODE1'),
            expect(data[0].description).toEqual('X-burger'),
            expect(data[0].price).toEqual(10),
            expect(data[0].category).toEqual('LANCHE');
          })
          .expect(HttpStatus.OK)
      })
      it("Removing", () => {  
        return request(productUrl)
          .delete(`/${productId}`)
          .set("Accept", "application/json")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body
            expect(status).toEqual(200),
            expect(message).toEqual('product was deleted successfully')
            expect(data).toEqual(null);
          })
          .expect(HttpStatus.OK)
      })
    })
  })