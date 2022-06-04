import { Router } from 'express';
import { UserController } from './controllers/UserController';
const routes = Router();

routes.get('/user', new UserController().find);
routes.post('/user', new UserController().create);
routes.put('/user/:id', new UserController().update);
export default routes;