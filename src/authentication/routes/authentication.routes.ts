import { Router } from 'express';
import { getAuthenticate, getToken } from '../controllers/authentication.controllers';
const routesAuthentication = Router();

routesAuthentication.get('/api/authentification/token/forcedToGenerate', getToken);
routesAuthentication.all('/api/*', getAuthenticate);
export { routesAuthentication };