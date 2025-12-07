import { OrderItem, OrderItemMapper } from "./orderItem";
import { User, UserMapper } from "./user";

export class Order {
    id!: number;
    usuario!: User;
    itens!: OrderItem[];
    dataPedido!: Date;
    valorTotal!: number;
    status!: 
        "PAGO" |
        "PENDENTE" |
        "CANCELADO";

}  

export class OrderMapper {
    static fromJson(json: any): Order {
        const order = new Order();
        order.id = json.id;
        order.usuario = UserMapper.fromJson(json.usuario);
        order.itens = json.itens.map((i: any) => OrderItemMapper.fromJson(i));
        order.dataPedido = new Date(json.dataPedido);
        order.valorTotal = json.valorTotal;
        order.status = json.status;
        return order;
    }

    static toJson(order: Order): any {
        return {
        id: order.id,
        usuario: UserMapper.toJson(order.usuario),
        itens: order.itens.map(i => OrderItemMapper.toJson(i)),
        dataPedido: order.dataPedido.toISOString(),
        valorTotal: order.valorTotal,
        status: order.status,
        };
    }
}  