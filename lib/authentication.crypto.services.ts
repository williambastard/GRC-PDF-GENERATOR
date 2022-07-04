import crypto from "crypto";
import path from "path";
import fs from "fs";

const encryptStringWithRsaPublicKey = function (toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt({ key: publicKey, passphrase: "@EtienneCRM2022.", padding: crypto.constants.RSA_PKCS1_PADDING }, buffer);
    return encrypted.toString("base64");
};

const decryptStringWithRsaPrivateKey = function (toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt({ key: privateKey, passphrase: "@EtienneCRM2022.", padding: crypto.constants.RSA_PKCS1_PADDING }, buffer);
    return decrypted.toString("utf8");
};

export { encryptStringWithRsaPublicKey, decryptStringWithRsaPrivateKey }