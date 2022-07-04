import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { Request, Response } from 'express';
import {
    drawImage,
    drawLinesOfText,
    drawRectangle,
    drawText,
    PDFArray,
    PDFContentStream,
    PDFDocument,
    PDFName,
    PDFNumber,
    PDFRawStream,
    PDFString
} from 'pdf-lib';
import { validator, pdf_1300_sd_1527 } from './login.schemasjson';

class User {
    session: any;

    constructor(session: any) {
        this.session = session;
    }
    getEmail = async () => {
        return "xxx@xxxx.fr";
    }

}
export default User;