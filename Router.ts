import { EventEmitter } from "stream";
import { Endpoint } from './constants/endpoint.enum';
import { Method } from "./constants/method.enum";
import { Endpoints, EventHandler, Handler } from "./models/endpoint.model";

export class Router {
  endpoints: Endpoints;
  emitter;

  constructor() {
    this.endpoints = {} as Endpoints;
    this.emitter = new EventEmitter()
  }

  private request(method: Method, path: Endpoint, handler: EventHandler) {
    let endpoint: Handler  = this.endpoints[path];

    if (!endpoint) {
      endpoint = {} as Handler;
    }

    if (endpoint[method]) {
      throw new Error(`[${method}] on path ${path} already exists`);
    }

    endpoint[method] = handler;
    this.endpoints[path] = endpoint;
  }

  get(path: Endpoint, handler: EventHandler) {
    this.request(Method.GET, path, handler);
  }

  post(path: Endpoint, handler: EventHandler) {
    this.request(Method.POST, path, handler);
  }

  put(path: Endpoint, handler: EventHandler) {
    this.request(Method.PUT, path, handler);
  }

  delete(path: Endpoint, handler: EventHandler) {
    this.request(Method.DELETE, path, handler);
  }
}