const AccessService = require("../services/access.service");

class AccessController {
  async signUp(req, res, next) {
    try {
      console.log(`[P]::signUp::`, req.body);
      const result = await AccessService.signUp(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AccessController();
