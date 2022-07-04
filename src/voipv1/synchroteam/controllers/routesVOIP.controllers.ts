import Synchroteam from '../models/routesVOIP.models';
import { Request, Response } from 'express';

import CircularJSON from 'circular-json';
import Ovh from '@ovh-api/api';
import apiMe from '@ovh-api/me';
import apiSms from '@ovh-api/sms';

const config = {
  appKey: 'M4g9qfoWQba12XGJ',
  appSecret: '9KoyKUa3U5F0Nn85clLmUqBDCVcrhbzV',
  consumerKey: 'EOTJgyiSs0JcllCmjCoqi3MM0OlqQerq',
  certCache: './cert-cache.json', // optional cache certificat on disk.
  accessRules: ['GET /*', 'POST /*', 'PUT /*', 'DELETE /*'], // optional limit the requested privileges.
};
const ovh = new Ovh(config);
const api = {
  me: apiMe(ovh),
  sms: apiSms(ovh),
};
// Get the serviceName (name of your sms account)
let isValidJSON = (testData: any) => {
  try {
    JSON.parse(testData);
    return true;
  } catch (error) {
    return false;
  }
};

const avertissementSMS = async (message = 'test') => {
  const { nichandle } = await api.me.$get();
  const data = await api.sms.$get();
  console.log(`${nichandle} have the following services:`);
  try {
    ovh.request('POST', '/sms/' + data[0] + '/jobs', {
      charset: 'UTF-8', // The sms coding (type: sms.CharsetEnum)
      class: 'flash', // The sms class (type: sms.ClassEnum)
      coding: '7bit', // The sms coding (type: sms.CodingEnum)
      differedPeriod: null, // The time -in minute(s)- to wait before sending the message (type: long)
      message: message, // The sms message (type: string)
      noStopClause: true, // Do not display STOP clause in the message, this requires that this is not an advertising message (type: boolean)
      priority: 'high', // The priority of the message (type: sms.PriorityEnum)
      receivers: ['0033650717809', '0033669967502'], // The receivers list (type: string[])
      receiversDocumentUrl: null, // The receivers document url link in csv format (type: string)
      receiversSlotId: null, // The receivers document slot id (type: string)
      sender: 'Etienne', // The sender (type: string)
      senderForResponse: false, // Set the flag to send a special sms which can be reply by the receiver (smsResponse). (type: boolean)
      tag: null, // The identifier group tag (type: string)
      validityPeriod: null, // The maximum time -in minute(s)- before the message is dropped (type: long)
    });
  } catch (e) {
    console.log(e);
  }
};

const getError = async (req: Request, res: Response) => {
  let result = {
    result: {
      numero: 'UNKNOWN',
      technician: { name: '', numero: '0188332800', complete: {} },
      message: "L'intervention n'existe pas ou ne vous est pas attribuée",
      password: 0,
      customer: {},
      req: {},
    },
  };
  return res.status(500).json(result);
};
const getJobListByID = async (req: Request, res: Response) => {
  const synchroteam = new Synchroteam(req.session);
  const Id = req.body.Id ?? req.params.Id ?? -1;
  const TypePhone = req.body.TypePhone ?? req.params.TypePhone ?? 'contactMobile';
  const callerPhone = req.body.callerPhone ?? req.params.callerPhone ?? 0;
  let alerteSMS = req.body.alerte ?? req.params.alerte ?? false;
  let password = Id * 7057 + 8273 + '';
  let data = {
    technician: { id: 0, name: '', numero: '0188332800', complete: {} },
    customer: {
      id: 0,
      myId: null,
      name: '',
    },
    contactMobile: '',
    contactPhone: '',
  };
  let dataTech = {
    id: 0,
    firstName: '',
    lastName: '',
    login: '',
    phone: '',
    profile: '',
    email: '',
    language: 'FR',
    lastConnection: new Date(),
    timezone: 'UTC',
  };

  let dataCustomer = {
    id: 0,
    myId: '',
    name: '',
    addressStreet: '',
    addressCity: '',
    addressZIP: '',
    addressProvince: '',
    addressComplement: '',
    addressCountry: '',
    address: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    contactMobile: '+33188332800',
    contactFax: '',
    vatNumber: '',
    publicLink: '',
    customFieldValues: [
      {
        id: 0,
        label: 'Tel',
        value: '',
      },
    ],
    Position: {
      latitude: '',
      longitude: '',
    },
    dateModified: '2022-04-13 20:13',
    dateCreated: '2021-10-21 16:43',
  };

  try {
    let json = await synchroteam.getJobList('GET', `https://ws.synchroteam.com/api/v3/job/details?num=${Id}`, 'JSON');

    if (isValidJSON(json?.data)) data = await JSON.parse(json.data);
    let techDetails = await synchroteam.getJobList('GET', `https://ws.synchroteam.com/api/v3/user/details?id=${data?.technician?.id}`, 'JSON');
    let customerDetails = await synchroteam.getJobList('GET', `https://ws.synchroteam.com/api/v3/customer/details?id=${data?.customer?.id}`, 'JSON');

    if (isValidJSON(techDetails?.data)) dataTech = JSON.parse(techDetails?.data);
    if (isValidJSON(customerDetails?.data)) dataCustomer = JSON.parse(customerDetails?.data);

    console.log(`Lancement de l'API VOIP: ${req.url}`);
    console.log({ json: json.data, tech: techDetails.data, customer: customerDetails.data });
  } catch (e) {
    console.log(e);
  }

  let result = {
    result: {
      numero: 'null',
      technician: { name: 'null', numero: '0188332800', complete: {} },
      message: "L'intervention n'existe pas ou ne vous est pas attribuée",
      password: password.substring(password.length - 6, password.length),
      customer: {},
      req: {},
    },
  };
  if (result && data) {
    result.result.technician.numero = dataTech?.phone.replace(/(\D+)/g, '') ?? '';
    result.result.technician.name = dataTech?.firstName ?? '';
    result.result.technician.complete = dataTech;
    result.result.customer = dataCustomer;
    result.result.req = CircularJSON.stringify(req.params);

    if (callerPhone == dataTech?.phone.replace(/(\D+)/g, '')) {
      result.result.numero = dataCustomer?.customFieldValues[`${TypePhone}`]?.value.replace(/(\+33+)/, '0') ?? '0188332800';
      result.result.message = 'Nous contactons le client...';
    } else {
      if (data?.customer.id > 0 && data?.technician?.id > 0) {
        result.result.numero = 'UNAUTHORIZED';
        result.result.message = "ACTION NON AUTORISÉE: Ce n'est pas votre client";
        if (alerteSMS == 'true') {
          avertissementSMS(
            `ALERTE: ${dataTech?.firstName} à tenté de contacter le client "${dataCustomer.name}" de l'intervention n°${Id} via le numéro ${callerPhone}, mais n'a pas été autorisé à l'appeler car son numéro ne correspond pas à sa fiche utilisateur`,
          );
        }
      } else {
        result.result.numero = 'UNKNOWN';
        result.result.message = `ERREUR: L'intervention n° ${Id} est introuvable`;
      }
    }
    return res.status(200).json(result);
  } else return res.status(500).json(result);
};

export { getError, getJobListByID };
