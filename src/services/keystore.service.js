const keystoreModel = require("../models/keystore.model");

class KeyStoreService {
  static async createKeyToken({ userId, publicKey, privateKey }) {
    try {
      const tokens = await keystoreModel.create({
        user: userId,
        publicKey,
        privateKey,
      });
      return tokens ? tokens : null;
    } catch (error) {
      return error;
    }
  }
}
module.exports = KeyStoreService;
