import { HttpStatus } from "@nestjs/common";
import { ResponseDTO } from "src/product/dto/response.dto";
import * as request from "supertest";


const mockrsp: ResponseDTO = {
    data: null,
    message : 'ola',
    status: 200
  }

describe("Product", () => {
    const olaUrl = `http://localhost:3000/api/v1/products`;
    describe("ola (GET)", () => {
      it("dar certo", () => {
        return request(olaUrl)
          .get("/ola")
          .expect((response: request.Response) => {
            const {
                status,
                data,
                message
            } = response.body;
  
            expect(status).toEqual(mockrsp.status),
            expect(message).toEqual(mockrsp.message),
            expect(data).toEqual(mockrsp.data);
          })
          .expect(HttpStatus.OK);
      });
    });
  });