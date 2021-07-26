import {User} from "./user";

export class Todo {
  id: number;
  description: string;
  done: number;
  currentAt: Date;
  user: User;
  constructor(description: string,currentAt: Date, user: User) {
    this.description = description;
    this.currentAt = currentAt;
    this.user = user;
  }
}
