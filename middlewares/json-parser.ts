import * as http from 'http';
import { MyResponse } from '../models/endpoint.model';
import { StatusCode } from '../constants/status-code.enum';

export function parseJson(_req: http.IncomingMessage, res: http.ServerResponse) {
  (res as MyResponse).send = <T>(data: { statusCode: StatusCode, data: T }) => {
    res.writeHead(data.statusCode, {
      'Content-type': 'application/json',
    })
    res.end(JSON.stringify(data.data));
  }
};