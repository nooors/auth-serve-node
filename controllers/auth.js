const { response, request } = require("express"); // a way to get types in javasript

const register = (req = request, res = response) => {
  console.log(req.body);

  return res.json({
    ok: true,
    msg: "Create user /register",
  });
};

const login = (req, res) => {
  return res.json({
    ok: true,
    msg: "Login de usuario/",
  });
};

const renew = (req, res) => {
  return res.json({
    ok: true,
    msg: "Renew token",
  });
};

module.exports = {
  register,
  login,
  renew,
};
