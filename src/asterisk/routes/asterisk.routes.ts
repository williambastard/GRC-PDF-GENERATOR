import { Router } from 'express';
import { loadAsterisk } from '../controllers/asterisk.controllers';
const routesAsterisk = Router();

routesAsterisk.get('/asterisk', loadAsterisk);
export { routesAsterisk };