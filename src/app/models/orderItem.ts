import { Product, ProductMapper } from "./product";

export class OrderItem {
    id!: number;
    pedido!: string;
    produto!: Product;
    quantidade!: number;
    preco!: number;
    subTotal!: number;
}

export class OrderItemMapper {
    static fromJson(json: any): OrderItem {
      const item = new OrderItem();
      item.id = json.id;
      item.pedido = json.pedido;
      item.produto = ProductMapper.fromJson(json.produto);
      item.quantidade = json.quantidade;
      item.preco = json.preco;
      item.subTotal = json.subTotal;
      return item;
    }
  
    static toJson(item: OrderItem): any {
      return {
        id: item.id,
        pedido: item.pedido,
        produto: ProductMapper.toJson(item.produto),
        quantidade: item.quantidade,
        preco: item.preco,
        subTotal: item.subTotal,
      };
    }
  }
  