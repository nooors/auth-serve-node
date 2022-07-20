const express = require( "express" );
const cors = require( "cors" );
// Import path from node. We need to use it to handle all the router that are not set explicitly
const path = require( 'path' );
const { dbConnection } = require( "./db/config.js" );

// use envoirement variables
require( "dotenv" ).config();

// Create express server/app
const app = express();

// Data Base
dbConnection();

// Public directory --> entry point of a web
app.use( express.static( "public" ) );

// CORS really is another middleware
app.use( cors() );

// Reading and parsing of the body
app.use( express.json() );

// Routes
// midleware
app.use( "/api/auth", require( "./routes/auth.js" ) );

// Handle all the other routes ---> change made in order to deploy angular in node public folder
app.use( '*', ( req, res ) => {
  res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
} );


app.listen( process.env.PORT, () => {
  console.log( `Server running at port ${ process.env.PORT }` );
} );
