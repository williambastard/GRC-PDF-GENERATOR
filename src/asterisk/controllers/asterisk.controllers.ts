import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { encryptStringWithRsaPublicKey, decryptStringWithRsaPrivateKey } from '../../../lib/authentication.crypto.services';

const getAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  let encryptedToken = req.query.token ?? req.body.token ?? req.params.token ?? null;
  if (encryptedToken === null) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
      return res.status(401).json({ status: 401, error: { message: "Token d'authentification manquant" } });
    }
    encryptedToken = req.headers.authorization.split(' ')[1] ?? '';
  }
  try {
    const test = encryptStringWithRsaPublicKey('test', path.join(process.cwd(), 'configs/keys/pub.pk'));
    const tokenUncrypted = decryptStringWithRsaPrivateKey(encryptedToken, path.join(process.cwd(), 'configs/keys/private.key'));

    if (tokenUncrypted.split('|').length !== 4) {
      res.setHeader('X-Security-Control', `Le token de sécurité n'est pas valide, il contient ${tokenUncrypted.split('|').length} élément`);
      return res.status(403).json({ status: 403, error: { message: "Token d'authentification invalide, le message est incomplet" } });
    }
    if (req.ip !== tokenUncrypted.split('|')[2]) {
      res.setHeader(
        'X-Security-Control',
        `Token authorisation ${req.ip} : Le token n'autorise pas l'IP: "${tokenUncrypted.split('|')[2]}" a accéder à la ressource cible`,
      );
      return res.status(403).json({ status: 403, error: { message: "Token d'authentification invalide, adresse IP non authorisée" } });
    }
    next();
    //return res.status(200).setHeader('X-Token-errors', 'success').json({ message: "Utilisateur Authentifié avec succès" });
  } catch (err) {
    res.setHeader('X-Security-Control', JSON.stringify(err).toString());
    return res.status(401).json({ status: 401, error: { message: "Token d'authentification invalide" } });
  }
};

//../lib/keys/private.key
const loadAsterisk = (req: Request, res: Response, next: NextFunction) => {
  res.send(`<!DOCTYPE html>
  <html>
    <head>
      <title>Socket.IO chat</title>
      <style>
        body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  
        #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
        #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
        #input:focus { outline: none; }
        #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }
  
        #messages { list-style-type: none; margin: 0; padding: 0; }
        #messages > li { padding: 0.5rem 1rem; }
        #messages > li:nth-child(odd) { background: #efefef; }
      </style>
    </head>
    <body>
      <ul id="messages"></ul>
      <!--
      <form id="form" action="">
        <input id="input" autocomplete="off" /><button>Send</button>
      </form> !-->
      
  
      <script>
        var data = {};
        var socket = io();
  
        var messages = document.getElementById('messages');
        
        var input = document.getElementById('input');
        /*
        var form = document.getElementById('form');
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
          }
        });*/
        function test(data,Id){
          if (data[Id])
            return false
          else 
            return true
        }
        socket.on('chat message', function(msg) {
          setTimeout(function(){
            var Id = btoa(msg.Event + "-" + msg.Uniqueid + "-" +msg.CallerIDNum);
            var item = document.createElement('li');
            if(test(Id)){
              item.textContent = "["+ msg.date + "] Appel de "+ msg.CallerIDName +" <"+ msg.CallerIDNum +">";
              messages.appendChild(item);

              data[Id] = msg;
            }
          },1000);
        });
      </script>
    </body>
  </html>`);
};

export { getAuthenticate, loadAsterisk };
