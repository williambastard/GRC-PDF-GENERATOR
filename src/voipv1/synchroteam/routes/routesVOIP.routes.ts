import { Router } from 'express';
import { getError, getJobListByID } from '../controllers/routesVOIP.controllers';
const routesVOIP = Router();

routesVOIP.get('/synchroteam/api/v3/job/:Id/:TypePhone/:callerPhone/:alerte', getJobListByID);
routesVOIP.get('/synchroteam/api/v3/job/*', getError);
export { routesVOIP };
