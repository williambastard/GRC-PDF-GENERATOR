import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { encryptStringWithRsaPublicKey, decryptStringWithRsaPrivateKey } from '../../../lib/authentication.crypto.services';
//../lib/keys/private.key
const aTh = function (str) {
  let arr1: string[] = [];
  for (let n = 0, l = str.length; n < l; n++) {
    let hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
};
let hTa = function (str = '', letDecode = '') {
  let hex = str.toString();
  for (let n = 0; n < hex.length; n += 2) {
    letDecode += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return letDecode;
};

const getAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  let encryptedToken = req.query.token ?? req.body.token ?? req.params.token ?? null;
  if (encryptedToken === null) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
      return res.status(401).json({ status: 401, error: { message: "Token d'authentification manquant" } });
    }
    encryptedToken = req.headers.authorization.split(' ')[1] ?? '';
  }

  try {
    const tokenUncrypted = decryptStringWithRsaPrivateKey(encryptedToken, path.join(process.cwd(), 'configs/keys/private.key'));

    console.log(tokenUncrypted );
    if (tokenUncrypted.split('|').length !== 4) {
      res.setHeader('X-Security-Control', `Le token de sécurité n'est pas valide, il contient ${tokenUncrypted.split('|').length} élément(s) sur 4 attendus.`);
      return res.status(403).json({ status: 403, error: { message: "Token d'authentification invalide, le message est incomplet" } });
    }
    if (req.ip !== tokenUncrypted.split('|')[2]) {
      res.setHeader(
        'X-Security-Control',
        `Token authorisation ${req.ip} : Le token n'autorise pas l'IP: "${tokenUncrypted.split('|')[2]}" a accéder à la ressource cible`,
      );
      return res.status(403).json({ status: 403, error: { message: "Token d'authentification invalide, adresse IP non authorisée pour la requête cible" } });
    }

    next();
    //return res.status(200).setHeader('X-Token-errors', 'success').json({ message: "Utilisateur Authentifié avec succès" });
  } catch (err) {
    res.setHeader('X-Security-Control', JSON.stringify(err).toString());
    return res.status(401).json({ status: 401, error: { message: "Token d'authentification invalide" } });
  }
};

//../lib/keys/private.key
const getToken = (req: Request, res: Response, next: NextFunction) => {
  const tokenUncrypted = encryptStringWithRsaPublicKey(
    `username|password|${req.ip}|${req.body.length}`,
    path.join(process.cwd(), 'configs/keys/pub.pk'),
  );
  return res.status(200).json({ status: 200, data: { token: tokenUncrypted } });
};

export { getAuthenticate, getToken };
