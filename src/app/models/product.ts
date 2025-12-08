export class Product {

  id!: number;
  nome!: string;
  descricao!: string;
  preco!: number;
  quantidadeEstoque!: number;
  categoria!: 
    "ELETRONICOS" |
    "ROUPAS"      |
    "ALIMENTOS"   |
    "LIVROS"      |
    "MOVEIS"      |
    "ESPORTE";
  caracteristicas!: string[];
}

export class ProductMapper {
  static fromJson(json: any): Product {
    const product = new Product();
    product.id = json.id;
    product.nome = json.nome;
    product.descricao = json.descricao;
    product.preco = json.preco;
    product.quantidadeEstoque = json.quantidadeEstoque;
    product.categoria = json.categoria;
    product.caracteristicas = json.caracteristicas || [];
    return product;
  }

  static toJson(product: Product): any {
    return {
      id: product.id,
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      quantidadeEstoque: product.quantidadeEstoque,
      categoria: product.categoria
    };
  }
}