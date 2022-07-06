const { response, request } = require( "express" ); // a way to get types in javasript
const { validationResult } = require( 'express-validator' );

const register = ( req = request, res = response ) => {


  return res.json( {
    ok: true,
    msg: "Create user /register",
  } );
};

const login = ( req = request, res = response ) => {

  const { email, passw } = req.body;
  console.log( email, passw );
  return res.json( {
    ok: true,
    msg: "Login de usuario/",
  } );
};

const renew = ( req = request, res = response ) => {
  return res.json( {
    ok: true,
    msg: "Renew token",
  } );
};

module.exports = {
  register,
  login,
  renew,
};
