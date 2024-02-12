import * as http from 'http';
import EventEmitter from 'events';
import { EventHandler, Handler, MyRequest } from './models/endpoint.model';
import { Router } from './Router';
import { Endpoint } from './constants/endpoint.enum';
import { Method } from './constants/method.enum';

export class Application {
  emitter;
  server;
  middlewares: EventHandler[];

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
    this.middlewares = [];
  }

  public listen(port: string, cb: () => void) {
    this.server.listen(port, cb);
  }

  public use(middleware: EventHandler) {
    this.middlewares.push(middleware);
  }

  private createServer() {
    return http.createServer((req, res) => {
     let body = '';

     req.on('data', (chunk) => {
       body += chunk;
     })

     req.on('end', () => {
       if (body) {
         (req as MyRequest).body = JSON.parse(body);
       }

       this.middlewares.forEach((middleware) => middleware(req, res));
       const isEmitted = this.emitter.emit(this.getRouteMask(req.url as Endpoint, req.method as Method), req, res);
   
       if (!isEmitted) {
         res.end();
       }
     })

   })
 }

  addRouter(router: Router) {
    const endpoints = router.endpoints;

    if (endpoints) {
      Object.keys(endpoints).forEach((path) => {
        const endpoint: Handler = endpoints[path as Endpoint];
        Object.keys(endpoint).forEach((method) => {
          const handler = endpoint[method as Method];
          this.emitter.on(this.getRouteMask(path as Endpoint, method as Method), (req, res) => {
            handler(req, res);
          })
        })
      })
    }

    
  }

  private getRouteMask(path: Endpoint, method: Method) {
    return `[${path}]:[${method}]`
  }
}