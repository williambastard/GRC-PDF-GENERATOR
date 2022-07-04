import { Router } from 'express';
import { setUser, getUser } from '../controllers/login.controllers';
const routesUser = Router();

routesUser.get('/login/auth', setUser);
routesUser.get('/login', getUser);
export { routesUser };