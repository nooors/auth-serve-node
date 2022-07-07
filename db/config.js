const mongoose = require( "mongoose" );

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_CONF
            //     , {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     useCreateIndex: true
            // } 
            // These options are deprecated since video tutorial was published. All these options are by deffault in this mongoose version
        );
        console.log( 'DB Online' );
    } catch ( error ) {
        console.log( error );
        throw new Error( 'Error in database connection' );
    }
};

module.exports = {
    dbConnection
};