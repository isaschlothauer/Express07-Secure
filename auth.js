const argon2 = require("argon2");
const { application } = require("express");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  console.log(req.body.hashedPassword)


  argon2
    .hash(req.body.hashedPassword, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      // delete req.body.hashedPassword;
      console.log(req.body.hashedPassword)

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};
