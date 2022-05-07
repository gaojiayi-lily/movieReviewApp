const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, 'jgaoac', (err, user) => {
      if (err) {
          res.status(401).json("invalid token!");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("not authenticated!");
  }
}

module.exports = verify;