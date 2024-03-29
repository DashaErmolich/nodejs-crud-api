import { Router } from "../Router";
import { Endpoint } from "../constants/endpoint.enum";
import * as usersController from './users-controller';

export const usersRouter = new Router();

usersRouter.get(Endpoint.Users, (req, res) => usersController.getUser(req, res));
usersRouter.post(Endpoint.Users, (req, res) => usersController.createUser(req, res));
usersRouter.put(Endpoint.Users, (req, res) => usersController.updateUser(req, res));
usersRouter.delete(Endpoint.Users, (req, res) => usersController.deleteUser(req, res));