import { Endpoint } from "../constants/endpoint.enum";
import { Method } from "../constants/method.enum";
import * as http from 'http';
import { User } from './user.model';
import { StatusCode } from '../constants/status-code.enum';

export type Handler = {
  [key in Method]: EventHandler;
}

export type Endpoints = {
[key in Endpoint]: Handler;
}

export type EventHandler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

export interface MyRequest extends http.IncomingMessage {
  body: {},
  data: {
    userId: string,
  }
}

export interface ResponseSendData {
  statusCode: StatusCode,
  data: User | User[] | string,
}

export interface MyResponse extends http.ServerResponse {
  send: <T>(data: { statusCode: StatusCode, data: T }) => void;
}