export class User {

  nome!: string;
  email!: string;
  senha!: string;
  tipoUsuario!: tipoUsuarioEnum

}
  
export enum tipoUsuarioEnum {
  "Cliente",
  "Admin"
}
