const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  static async signUp({ name, email, password }) {
    try {
      const holdShop = await shopModel.findOne({ email }).lean();
      if (holdShop) {
        return {
          code: "xxxx",
          message: "Shop already registered!",
        };
      }
      const passwordHash = await bcrypt.hashSync(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        // create privateKey, publicKey
        const { privateKey, publicKey } = await crypto.generateKeyPair("rsa", {
          modulusLength: 4096,
        });
        // save to keystore
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: error.status,
      };
    }
  }
}
module.exports = AccessService;
