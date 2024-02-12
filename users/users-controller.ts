
import * as http from 'http';
import { MyResponse, MyRequest, UserBody } from '../models/endpoint.model';
import { User } from '../models/user.model';
import { StatusCode } from '../constants/status-code.enum';
import { HttpError } from '../errors/HttpException';
import { userService } from './users-server';

export async function getUser(req: http.IncomingMessage, res: http.ServerResponse) {
try {
  const userId = (req as MyRequest).data?.userId;
  
  if (userId) {
    const user: User | undefined = userService.findOne(userId);
    if (user) {
      return (res as MyResponse).send<User>({ statusCode: StatusCode.OK, data: user });
    } else {
      throw new HttpError(StatusCode.NON_EXISTS_ERROR, 'User not found')
    }
  }

  (res as MyResponse).send<User[]>({ statusCode: StatusCode.OK, data: userService.getAll() });

} catch (error) {
  (res as MyResponse).send({ statusCode: StatusCode.NON_EXISTS_ERROR, data: error });
}
}

export async function createUser(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const data: UserBody = (req as MyRequest).body;
    const newUser: User = {...data, id: crypto.randomUUID() };

    userService.addOne(newUser);

    (res as MyResponse).send<User>({ statusCode: StatusCode.CREATED, data: newUser });
  } catch (error) {
    (res as MyResponse).send({ statusCode: StatusCode.NON_EXISTS_ERROR, data: error });
  }
}

export async function updateUser(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const userId = (req as MyRequest).data?.userId;
    const data: UserBody = (req as MyRequest).body;
    
    if (userId) {
      const user: User | undefined = userService.findOne(userId);
      if (user) {
        const updatedUser: User = { ...data, id: user.id };
        userService.updateOne(updatedUser);
        return (res as MyResponse).send<User>({ statusCode: StatusCode.OK, data: updatedUser });
      } else {
        throw new HttpError(StatusCode.NON_EXISTS_ERROR, 'User not found')
      }
    }
  
  } catch (error) {
    (res as MyResponse).send({ statusCode: StatusCode.NON_EXISTS_ERROR, data: error });
  }
}

export async function deleteUser(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const userId = (req as MyRequest).data?.userId;
    
    if (userId) {
      const user: User | undefined = userService.findOne(userId);
      if (user) {
        userService.deleteOne(user.id);
        return (res as MyResponse).send<string>({ statusCode: StatusCode.OK, data: 'User deleted' });
      } else {
        throw new HttpError(StatusCode.NON_EXISTS_ERROR, 'User not found')
      }
    }
  
  } catch (error) {
    (res as MyResponse).send({ statusCode: StatusCode.NON_EXISTS_ERROR, data: error });
  }
}