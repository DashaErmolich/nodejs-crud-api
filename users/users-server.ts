import { User } from "../models/user.model";

export class UserService {
  private users: User[] = [
    {
      id: '11',
      username: 'tet',
      age: 55,
      hobbies: ['ffff']
    }
  ];

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getAll(): User[] {
    return this.users;
  }

  addOne(user: User): void {
    this.users = [...this.users, user];
  }
}

export const userService = new UserService();