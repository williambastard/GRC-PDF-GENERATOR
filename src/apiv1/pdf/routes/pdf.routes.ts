import { Router } from 'express';
import { getPDF, createPDF, createInvoice, createInvoicePreview } from '../controllers/pdf.controllers';
const routesPDF = Router();

//Routes de creation PDF TVA
routesPDF.get('/attestations/tva/vierge', getPDF);
routesPDF.get('/attestations/tva/complete', createPDF);
routesPDF.post('/attestations/tva/complete', createPDF);

/* //Autres routes
routesPDF.get('/preview/invoice/:id', createInvoicePreview);
routesPDF.post('/preview/invoice/:id', createInvoicePreview);
 */
//Routes de génération des préview
routesPDF.get('/:mime/preview/:type/:id', createInvoicePreview);
routesPDF.post('/:mime/preview/:type/:id', createInvoicePreview);

//Route de génération des factures et devis définitifs
routesPDF.get('/:mime/:type/:id', createInvoice);
routesPDF.post('/:mime/:type/:id', createInvoice);


export { routesPDF };