"use strict";
const JWT = require("jsonwebtoken");
const createTokenPairs = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      //   algorithm: "RS256",
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      //   algorithm: "RS256",
      expiresIn: "7 days",
    });

    await JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error("ERR::", err);
      } else {
        console.log("DECODE::", decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};
module.exports = {
  createTokenPairs,
};
