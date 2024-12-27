var jwt = require("jsonwebtoken");
function verificarToken(req, res, next) {
  var authHeader = req.get('authorization');
  console.log(authHeader);
  const retrievedToken = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if (!retrievedToken) {
    res.status(401).send({
      ok: false,
      message: "Token inválido"
    })
  } else {
    jwt.verify(retrievedToken, process.env.TOKEN_SECRET, function (err, retrievedToken) {
      if (err) {
        res.status(401).send({
          ok: false,
          message: "Token inválido"
        });
      } else {
        next();
      }
    });
  }
}

module.exports = { verificarToken };