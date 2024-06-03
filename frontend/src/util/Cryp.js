import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;

const encrypt = (text) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const encryptText = CryptoJS.AES.encrypt(text, secretKey).toString();

  return encryptText;
};

const decrypt = (text) => {
  const bytes = CryptoJS.AES.decrypt(text, secretKey);
  const decryptText = bytes.toString(CryptoJS.enc.Utf8);

  return decryptText;
};

export { encrypt, decrypt };
