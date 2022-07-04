import fs from 'fs';
import sha1 from 'sha1';
import path from 'path';
import QRCode from 'qrcode';
import puppeteer from 'puppeteer';
import CircularJSON from 'circular-json';
import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { validator, pdf_1300_sd_1527, devis } from './pdf.schemasjson';

let loader = new TwingLoaderFilesystem(`./public/views/layouts/pdf`);
let twing = new TwingEnvironment(loader, {
  debug: true,
  cache: `./public/cache`,
  auto_reload: true,
  autoescape: false,
});

const date = new Date();
const dateISO = date.toLocaleString('fr-FR');

class PDF {
  pdfMime: String;
  pdfName: String;
  pdfObjectData: Array<object>;
  pdfObjectDataErrors: object;
  isValidpdfObjectData: Boolean;

  constructor(pdfMime?: String, pdfName?: String, pdfObjectData?: Array<object>) {
    this.pdfMime = pdfMime ?? 'pdf';
    this.pdfName = pdfName ?? '';
    this.pdfObjectData = pdfObjectData ?? [{}];
    this.isValidpdfObjectData = true;
    this.pdfObjectDataErrors = [];
  }
  shemasValidator = (pdfObjectData, schema) => {
    let pdfObjectValidator;
    pdfObjectValidator = validator.validate(pdfObjectData, schema);
    this.pdfObjectDataErrors = pdfObjectValidator.errors ?? false;
    this.isValidpdfObjectData = pdfObjectValidator.errors < 1;
    return { isValidOject: this.isValidpdfObjectData, objectError: this.pdfObjectDataErrors, schemaObj: this };
  };

  getPDF = async (pdfFile: string = '1300-sd_1527') => {
    try {
      let pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(process.cwd(), `public/views/templates/${pdfFile}.pdf`)));
      pdfDoc.setTitle(pdfDoc.getTitle() + '🥚 The Life of an Egg 🍳');
      pdfDoc.setAuthor('Humpty Dumpty');
      pdfDoc.setSubject('📘 An Epic Tale of Woe 📖');
      pdfDoc.setKeywords(['eggs', 'wall', 'fall', 'king', 'horses', 'men']);
      pdfDoc.setProducer('PDF App 9000 🤖');
      pdfDoc.setCreator('ETIENNE SERVICES PDFCREATOR');
      pdfDoc.setCreationDate(new Date());
      pdfDoc.setModificationDate(new Date());
      const pdfBytes = await pdfDoc.save();
      return { status: 200, mime: 'application/pdf', data: pdfBytes, doc: Buffer.from(pdfBytes) };
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        mime: 'application/json',
        errors: `Impossible de générer le PDF, le document ${pdfFile} semble absent ou inaccessible des templates disponibles.`,
        data: '',
        doc: '',
      };
    }
  };

  createTVA = async (pdfObjectData, signature) => {
    this.pdfObjectData = pdfObjectData;
    const { isValidOject, objectError, schemaObj } = this.shemasValidator(pdfObjectData, pdf_1300_sd_1527);

    if (isValidOject) {
      try {
        let pdfDoc = await PDFDocument.load(fs.readFileSync(path.join(process.cwd(), `public/views/templates/${this.pdfName}.pdf`)));

        signature = await pdfDoc.embedPng(signature);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        // Get the form containing all the fields
        let form = pdfDoc.getForm();

        await pdfObjectData.forEach(async (columnName, indesxArr, arr) => {
          const dataArr = pdfObjectData[indesxArr] ?? null;
          if (dataArr !== null) {
            await Object.keys(dataArr).forEach(async (key, value) => {
              let dataFromIndex = dataArr[key] ?? '';
              if (dataFromIndex === '' && typeof dataArr[key] !== 'boolean') {
                console.log(`${pdfObjectData[indesxArr]['interno']} : ${key} vaut "${dataArr[key]}"`);
              }

              if (typeof dataFromIndex === 'boolean') {
                if (dataFromIndex) form.getCheckBox(key).check();
              } else {
                if (key.match(/image/)) {
                  form.getButton(key).setImage(signature);
                } else form.getTextField(key).setText(dataFromIndex.toString());
              }
            });
          }
        });
        /*
                    form.getTextField('nom').setText('test');*/
        pdfDoc.setTitle(pdfDoc.getTitle() + '🥚 The Life of an Egg 🍳');
        pdfDoc.setAuthor('Charly IFRAH');
        pdfDoc.setSubject('📘 An Epic Tale of Woe 📖');
        pdfDoc.setKeywords(['eggs', 'wall', 'fall', 'king', 'horses', 'men']);
        pdfDoc.setProducer('PDF App 9000 🤖');
        pdfDoc.setCreator('ETIENNE SERVICES (https://www.etienne-services.fr)');
        pdfDoc.setCreationDate(date);
        pdfDoc.setModificationDate(date);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const secondPage = pages[1];
        const { width, height } = firstPage.getSize();

        firstPage.drawText(`COPIE CERTIFIÉE PAR ETIENNE SERVICES LE ${dateISO}`, {
          x: 5,
          y: 5,
          size: 4,
          font: helveticaFont,
          color: rgb(0.85, 0.5, 0.5),
          rotate: degrees(0),
        });

        secondPage.drawText(`COPIE CERTIFIÉE PAR ETIENNE SERVICES LE ${dateISO}`, {
          x: 5,
          y: 5,
          size: 4,
          font: helveticaFont,
          color: rgb(0.85, 0.5, 0.5),
          rotate: degrees(0),
        });

        // Flatten the form's fields
        form.flatten();

        const pdfBytes = await pdfDoc.save();
        const pdfBuffer = Buffer.from(pdfBytes);

        return { status: 200, mime: 'application/pdf', data: pdfBytes, doc: pdfBuffer };
      } catch (e) {
        console.log(e);
        return { status: 500, mime: 'application/json', errors: e, data: '', doc: '' };
      }
    } else {
      console.log(schemaObj);
      return {
        status: 403,
        mime: 'application/json',
        errors: objectError,
        data: '',
        doc: '',
      };
    }
  };

  generateInvoiceHTML = async (pageHTML: string, pdfObjectData: Array<object>) => {
    // set your html as the pages content
    let html,
      dateDevis = new Date(pdfObjectData['date_devis']),
      uid = `${pdfObjectData['type_document'].toUpperCase()}_${pdfObjectData['id']}`,
      pageid = `${uid}-signed_${sha1(uid + dateDevis.toISOString())}`;
    // With async/await
    const generateQR = async (text) => {
      try {
        return await QRCode.toDataURL(text);
      } catch (err) {
        return err;
      }
    };

    console.log(pdfObjectData);
    pdfObjectData['QR'] = await generateQR(`https://api.crm.etienne-services.fr/generated/invoices/${pageid}`);
    pdfObjectData['date'] = date;
    await twing
      .render(pageHTML, {
        titlePage: `${pdfObjectData['type_document'].toUpperCase()} N°${pdfObjectData['id']}`,
        HOST: 'http://api.crm.etienne-services.fr/',
        doc: pdfObjectData,
      })
      .then((output) => {
        html = output;
      });
    return { html: html, pageid: pageid };
  };

  createInvoice = async (pdfObjectData: Array<object>, type: string) => {
    try {
      let { html, pageid } = await this.generateInvoiceHTML('invoices.invoices.html', pdfObjectData);
      // launch a new chrome instance
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl', '--ignore-certificate-errors'],
      });

      // create a new page
      const page = await browser.newPage();
      page.setCacheEnabled(true);
      await page.setContent(html, {
        waitUntil: 'domcontentloaded',
      });
      // create a pdf buffer
      const pdfBuffer = await page.pdf({
        format: 'a4',
        printBackground: true,
      });

      // close the browser
      await browser.close();
      const mergedPdf = await PDFDocument.create();

      const pdfA = await PDFDocument.load(pdfBuffer);
      const pdfB = await PDFDocument.load(fs.readFileSync(path.join(process.cwd(), `public/views/templates/1300-sd_1527.pdf`)));

      const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
      const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());

      copiedPagesA.forEach((page) => mergedPdf.addPage(page));
      copiedPagesB.forEach((page) => mergedPdf.addPage(page));

      const mergedPdfFile = await mergedPdf.save();

      if (this.pdfMime === 'pdf')
        return { status: 200, mime: 'application/pdf', pageid: pageid, data: mergedPdfFile, doc: Buffer.from(mergedPdfFile) };
      return { status: 200, mime: 'text/html', pageid: pageid, data: html, doc: html };
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        mime: 'application/json',
        error: e,
        pageid: Math.floor(Math.random() * 1000000),
        data: { html: '', pageid: '' },
        doc: Buffer.from(''),
      };
    }
  };

  createInvoicePreview = async (pdfObjectData: Array<object>, type: string) => {
    this.pdfObjectData = pdfObjectData;
    const { isValidOject, objectError, schemaObj } = this.shemasValidator(pdfObjectData, devis);
    if (isValidOject) {
      try {
        let { html, pageid } = await this.generateInvoiceHTML('preview.invoices.html', pdfObjectData);
        // launch a new chrome instance
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl', '--ignore-certificate-errors'],
        });

        // create a new page
        const page = await browser.newPage();
        page.setCacheEnabled(true);
        await page.setContent(html, {
          waitUntil: 'domcontentloaded',
        });
        // create a pdf buffer
        const pdfBuffer = await page.pdf({
          format: 'a4',
          printBackground: true,
        });
        // close the browser
        await browser.close();
        const mergedPdf = await PDFDocument.create();
        const pdfA = await PDFDocument.load(pdfBuffer);

        const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());

        copiedPagesA.forEach((page) => mergedPdf.addPage(page));

        const mergedPdfFile = await mergedPdf.save();

        if (this.pdfMime === 'pdf')
          return { status: 200, mime: 'application/pdf', pageid: pageid, data: mergedPdfFile, doc: Buffer.from(mergedPdfFile) };
        return { status: 200, mime: 'text/html', pageid: pageid, data: html, doc: html };
      } catch (e) {
        console.log(e);
        return {
          status: 500,
          mime: 'application/json',
          error: e,
          pageid: Math.floor(Math.random() * 1000000),
          data: { html: '', pageid: '' },
          doc: Buffer.from(''),
        };
      }
    } else {
      console.log(schemaObj);
      return {
        status: 403,
        mime: 'application/json',
        errors: objectError,
        data: '',
        doc: '',
      };
    }
  };
}
export default PDF;
