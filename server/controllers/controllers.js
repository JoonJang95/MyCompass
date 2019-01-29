const { Users } = require('../../database/index.js');

module.exports = {
  checkLogin: (req, res) => {
    let { username, password } = req.body;

    Users.findOne({ username: username })
      .then(results => {
        if (results) {
          if (results.password === password) {
            res.status(202).send({ isValid: true });
          } else {
            res.status(202).send({ isValid: false });
          }
        } else {
          res.status(202).send({ isValid: 404 });
        }
      })
      .catch(err => {
        console.log('error authenticating with database: ', err);
        res.sendStatus(500);
      });
  }
};
