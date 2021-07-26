import {Role} from "./role";

export class User {
  id: number ;
  login: string;
  password: string;
  firstName: string;
  lastName: string ;
  phoneNumber: string ;
  role: Role;
  constructor(password: string, id: number, login: string, firstName: string,
              lastName: string, phoneNumber: string,role: Role ) {
    this.password = password;
    this.id = id;
    this.login = login;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }
}
