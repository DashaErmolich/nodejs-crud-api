import * as http from 'http';
import { Endpoint } from '../constants/endpoint.enum';
import { MyRequest } from '../models/endpoint.model';

export function parseUrl(req: http.IncomingMessage, _res: http.ServerResponse) {
  const path = req.url;

  if (!path) {
    throw new Error('Wrong url')
  }

  if (path.startsWith(Endpoint.Users)) {
    const userId = path.split(`${Endpoint.Users}/`)[1];

  if (userId) {
    (req as MyRequest).data = {
      userId
    };
    req.url = Endpoint.Users;
  }
  }

  
}