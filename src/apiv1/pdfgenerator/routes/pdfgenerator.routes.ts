import { Router } from 'express';
import { generateTVA } from '../controllers/pdfgenerator.controllers';
const routesPDFTVAGenerator = Router();

routesPDFTVAGenerator.get('/synchroteam/api/v3/job/list', generateTVA);
export { routesPDFTVAGenerator };
