import { Router } from 'express';
import { CommentsController } from './controllers/CommentsContrller';
import { LikesController } from './controllers/LikesController';
import { MediaController } from './controllers/MediaController';
import { PostController } from './controllers/PostController';
import { UserController } from './controllers/UserController';
import Multer from 'multer';


const routes = Router();
const multer = Multer({ dest: './uploads/', storage: Multer.memoryStorage() });

const postController = new PostController();
const userController = new UserController();
const commentsContrller = new CommentsController();
const likeController =  new LikesController();
const mediaContrller = new MediaController();

routes.get('/users', userController.find);
routes.get('/users/:id', userController.findOne);
routes.post('/users', userController.create);
routes.put('/users/:id', userController.update);

routes.get('/posts', postController.find);
routes.get('/posts/:id', postController.findOne);
routes.post('/posts', postController.create);
routes.put('/posts/:id', postController.update);
routes.delete('/posts/:id', postController.delete);

routes.get('/comments/:id', commentsContrller.find);
routes.post('/comments', commentsContrller.create);
routes.put('/comments/:id', commentsContrller.update);
routes.delete('/comments/:id', commentsContrller.delete);

routes.get('/likes/:id', likeController.find);
routes.post('/likes', likeController.create);
routes.delete('/likes/:id', likeController.delete);



routes.post('/upload/:name', multer.single('file'), mediaContrller.upload);

export { routes };