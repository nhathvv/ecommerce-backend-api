const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyStoreService = require("../services/keystore.service");
const { getInfoData } = require("../utils/index");
const { createTokenPairs } = require("../auth/authUtils");

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
        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");
        const keyStore = await KeyStoreService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });
        if (!keyStore) {
          return {
            code: "xxx",
            status: "keyStore error",
          };
        }
        const tokens = await createTokenPairs(
          {
            userId: newShop._id,
            email,
          },
          publicKey,
          privateKey
        );
        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fiels: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }
      return {
        code: 20,
        metadata: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  }
}
module.exports = AccessService;
