
import { USERS } from '../db';
import * as http from 'http';
import { MyResponse, MyRequest } from '../models/endpoint.model';
import { User } from '../models/user.model';
import { StatusCode } from '../constants/status-code.enum';

export async function getUser(req: http.IncomingMessage, res: http.ServerResponse) {
  const userId = (req as MyRequest).data?.userId;
  if (userId) {
    const user: User | undefined = USERS.find((user) => user.id === userId);
    if (user) {
      return (res as MyResponse).send<User>({ statusCode: StatusCode.OK, data: user });
    } else {
      return (res as MyResponse).send<string>({ statusCode: StatusCode.NON_EXISTS_ERROR, data: 'User not found' });
    }
  }

  return (res as MyResponse).send<User[]>({ statusCode: StatusCode.OK, data: USERS });
}

export async function createUser(_req: http.IncomingMessage, _res: http.ServerResponse) {
  return USERS[0];
}