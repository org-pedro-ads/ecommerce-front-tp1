export class User {
  id!: number;
  nome!: string;
  email!: string;
  senha!: string;
  admin!: boolean;
}

export class UserMapper {
  static fromJson(json: any): User {
    const user = new User();
    user.id = json.id;
    user.nome = json.nome;
    user.email = json.email;
    user.senha = json.senha;
    user.admin = json.admin;
    return user;
  }

  static toJson(user: User): any {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      admin: user.admin,
    };
  }

  static toCreateJson(user: User): any {
    return {
      nome: user.nome,
      email: user.email,
      senha: user.senha,
    };
  }

  static toUpdateJson(user: User): any {
    return {
      nome: user.nome,
      email: user.email,
    };
  }

}
