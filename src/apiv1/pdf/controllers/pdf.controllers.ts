import fs from 'fs';
import PDF from '../models/pdf.models';
import { pdfDataStructure, pdfObjectData, signature } from '../../../../lib/pdf.structures.lib';
import { Request, Response } from 'express';
import CircularJSON from 'circular-json';

/* Génération d'attestation de TVA */
const getPDF = async (req: Request, res: Response) => {
  const pdf = new PDF('pdf', req.params.id ?? '1300-sd_1527');
  const bytes = await pdf.getPDF();
  if (bytes.status === 200) {
    return res.status(bytes.status).type('application/pdf').send(Buffer.from(bytes.data));
  } else return res.status(bytes.status).type(bytes.mime).json(bytes);
};

const createPDF = async (req: Request, res: Response) => {
  const pdf = new PDF('pdf', req.params.id ?? '1300-sd_1527');
  const bytes = await pdf.createTVA(req.body.pdf ?? pdfDataStructure, req.body.signature);
  if (bytes.status === 200) {
    fs.writeFileSync(`./generated/no-signed_${Math.floor(Math.random() * 1000000)}.pdf`, bytes.data);
    fs.writeFileSync(`./generated/signed_${Math.floor(Math.random() * 1000000)}.pdf`, bytes.doc);
    return res.status(bytes.status).type('application/pdf').send(bytes.doc);
  } else return res.status(bytes.status).type(bytes.mime).json(bytes);
};

/* Génération de factures et devis */
const createInvoice = async (req: Request, res: Response) => {
  console.log(`createInvoice Parms: ${CircularJSON.stringify(req.params)}`);
  console.log(`createInvoice Body: ${CircularJSON.stringify(req.body)}`);
  const pdfObj = req.body.pdfObjectData ?? pdfObjectData;
  const type = req.params.type ?? 'invoice';
  const pdf = new PDF(req.params.mime ?? 'pdf');
  const bytes = await pdf.createInvoice(pdfObj, type);

  if (bytes) {
    if (bytes.status === 200 && bytes.mime === 'application/pdf') {
      fs.writeFileSync(`./generated/${bytes.mime.split('/')[1]}/${bytes.pageid}.${bytes.mime.split('/')[1]}`, bytes.data);
      return res.status(bytes.status).type(bytes.mime).send(bytes.doc);
    }
    if (bytes.status === 200 && bytes.mime === 'text/html') {
      fs.writeFileSync(`./generated/${bytes.mime.split('/')[1]}/${bytes.pageid}.${bytes.mime.split('/')[1]}`, bytes.data);
      return res.status(bytes.status).type(bytes.mime).send(bytes.doc);
    }
    return res.status(bytes.status).type(bytes.mime).json(bytes);
  } else return res.status(500).json({ error: "Une erreur s'est produite" });
};

/* Génération de factures et devis */
const createInvoicePreview = async (req: Request, res: Response) => {
  console.log(`createInvoicePreview Params: ${CircularJSON.stringify(req.params)}`);
  console.log(`createInvoicePreview Body: ${CircularJSON.stringify(req.body)}`);

  const pdfObj = req.body.pdfObjectData ?? pdfObjectData;
  const type = req.params.type ?? 'invoice';
  const pdf = new PDF(req.params.mime ?? 'html', type, pdfObj);
  const bytes = await pdf.createInvoicePreview(pdfObj, type);

  if (bytes) {
    if (bytes.status === 200 && bytes.mime.match(/pdf|html|text/)) {
      return res.status(bytes.status).type(bytes.mime).send(bytes.doc);
    }
    return res.status(bytes.status).type(bytes.mime).json(bytes);
  } else return res.status(500).json({ error: "Une erreur s'est produite" });
};

export { getPDF, createPDF, createInvoice, createInvoicePreview };
