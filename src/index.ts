import fs from 'fs';
import cors from 'cors';
import path from 'path';
import http from 'http';
import https from 'https';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet-csp';
import session from 'express-session';
import RateLimit from 'express-rate-limit';
import aio from 'asterisk.io';

import { routesPDFTVAGenerator } from './apiv1/pdfgenerator/routes/pdfgenerator.routes';
import { routesAuthentication } from './authentication/routes/authentication.routes';
import { routesVOIP } from './voipv1/synchroteam/routes/routesVOIP.routes';
import { routesAsterisk } from './asterisk/routes/asterisk.routes';
import { routesUser } from './apiv1/login/routes/login.routes';
import { routesPDF } from './apiv1/pdf/routes/pdf.routes';

import { connectToDatabase } from '../configs/databaseConnection';
import { Server } from 'socket.io';

const privateKey = fs.readFileSync(path.join(process.cwd(), '/sslcert/privkey.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(process.cwd(), '/sslcert/cert.pem'), 'utf8');
const ca = fs.readFileSync(path.join(process.cwd(), '/sslcert/chain.pem'), 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

// creating 24 hours from milliseconds
dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const HOSTSSL = process.env.HOST || 'https://localhost';
const PORT = parseInt(process.env.PORT || '4500');
const PORTSSL = parseInt(process.env.PORTSSL || '4545');

const apiLimiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

let ami = aio.ami(
  'api.crm.etienne-services.fr', // Asterisk PBX machine
  5038, // the default port number setup
  // in "/etc/asterisk/manager.conf"
  // in "general" section
  'etienne', // manager username
  'EtiennePBX202X.', // manager password
);

const histories = [];
const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const io = new Server(httpServer);

/* configuration des sécurités & proxy */
app.set('trust proxy', 1);
app.use(
  session({
    secret: '353EAB6C654793989FB310E4ED0D14B5.8A59FE8D705D43AAFD46CE24ACBA84FADBC509C@69C9F4DC8728C5E463ED9CB61CFF125DAE99A3C47B6B5503807331479',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true },
    resave: false,
  }),
);
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);
/*
app.use(helmet({
  directives: {
    defaultSrc: ["'*'"],
    styleSrc: ["'self'", '*']
  }
}))
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(process.cwd(), 'public/views/')));
app.use('/generated', express.static(path.join(process.cwd(), 'generated')));

/* Gestion  des routes de l'application */
app.use('/', routesAsterisk);
app.use('/', routesAuthentication);
app.use('/voip', routesVOIP);
app.use('/api', routesPDFTVAGenerator);
app.use('/api', routesUser);
app.use('/api', routesPDF);

app.get('/', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/18838509/UVRAGmRp');
});

/* test 
const user = {
  firstName: 'Tim',
  lastName: 'Cook',
}


*/
/*
io.on('connection', (socket) => {
  histories.forEach((history) => {
    io.emit('chat message', history);
  });
  ami.on('eventAny', function (data) {
    if (data.Event.includes('Newchannel')) {
      histories.push(<never>data);
      data.date = new Date().toISOString();
      console.log(data)
      io.emit('chat message', data);
    }
  });
  ami.on('error', function (err) {
    throw err;
  });
});
*/
httpServer.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`SERVEUR HTTP À L'ECOUTE SUR ${HOST}:${PORT} 🎉`);
});

httpsServer.listen(PORTSSL, async () => {
  await connectToDatabase();
  console.log(`SERVEUR HTTPS À L'ECOUTE SUR ${HOST}:${PORTSSL} 🎉`);
});
