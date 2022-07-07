const { response, request } = require( "express" ); // a way (trick) to get types in javasript
const User = require( '../models/User.js' );
const bcrypt = require( 'bcryptjs' );
const { generateJWT } = require( '../helpers/jwt' );


const register = async ( req = request, res = response ) => {

  const { email, name, password } = req.body;

  try {
    // Verify email
    const user = await User.findOne( { email } );

    if ( user ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'this email already exists for an user'
      } );
    }

    // Create User with model
    const dbUser = new User( req.body );

    // encript password
    const salt = bcrypt.genSaltSync( 10 );
    dbUser.password = bcrypt.hashSync( password, salt );

    // Generate JW
    const token = await generateJWT( dbUser.id, name );

    // Create user in DB
    await dbUser.save();

    // Generate response
    return res.status( 201 ).json( {
      ok: true,
      uid: dbUser.id,
      name,
      token
    } );
  } catch ( error ) {
    console.log( error );
    return res.status( 500 ).json( {
      ok: false,
      msg: 'Contact sever admin please'
    } );

  }
};

const login = async ( req = request, res = response ) => {

  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne( { email } );

    if ( !dbUser ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'User not found'
      } );
    }

    // Check password
    const validPass = bcrypt.compareSync( password, dbUser.password );
    if ( !validPass ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: "Password don't match"
      } );
    }

    // user and pass correct, generate jwt.
    const token = await generateJWT( dbUser.id, dbUser.name );

    // generate response
    return res.json( {
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token
    } );

  } catch ( error ) {
    console.log( error );
    return res.status( 500 ).json( {
      ok: false,
      msg: "Contact with server admin please"
    } );
  }








};

const renew = ( req = request, res = response ) => {

  const token = req.header( 'x-token' );
  return res.json( {
    ok: true,
    msg: "Renew token",
    token
  } );
};

module.exports = {
  register,
  login,
  renew,
};
