import { StatusCode } from "../constants/status-code.enum";

export class HttpError extends Error {
  code;
  message;
  description;

  constructor(code: StatusCode, message: string) {
    super(message);
    this.name = 'HttpError';
    this.message = message;
    this.code = code;
    this.description = message;
  }
}