class AccessController {
  async signUp(req, res, next) {
    try {
      console.log(`[P]::signUp::`, req.body);
      return res.status(201).json({
        code: "201",
        metadata: {
          userId: 1,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AccessController();
