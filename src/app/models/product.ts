export class Product {

    id!: number;
    nome!: string;
    descricao!: string;
    preco!: number;
    quantidadeEstoque!: number;
    categoria!: enumCategoriaProduto

}
  
export enum enumCategoriaProduto {
  "ELETRONICOs",
  "ROUPAS",
  "ALIMENTOS",
  "LIVROS",
  "MOVEIS",
  "ESPORTE"
}