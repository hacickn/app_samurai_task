const axios = require( "axios" )

const url1 =
    "https://prod-storyly-media.s3.eu-west-1.amazonaws.com/test-scenarios/sample_1.json";
const url2 =
    "https://prod-storyly-media.s3.eu-west-1.amazonaws.com/test-scenarios/sample_2.json";
const url3 =
    "https://prod-storyly-media.s3.eu-west-1.amazonaws.com/test-scenarios/sample_3.json";

async function fetch( url ) {
    return await axios
        .request( {
            url: url,                               // Its path
            method: "GET",                          // It is GET request
            headers: {
                "Content-Type": "application/json"  // Accept only json types
            },
        } )
        .then( async function ( response ) {
            if ( response.status === 200 ) {        // If response status is equal to 200, then return the data
                return response.data
            } else {                                // If response status is not equal to 200, then show the current status
                console.log( response.status + " code is taken!" )
                return null
            }
        } )
        .catch( async function ( error ) {
            console.log( error.message )            // If error is caught by function, show it
            return null
        } );
}

function calculatePrice( data ) {
    if ( data.price !== undefined ) {               // if price is not undefined then it means we can directly calculate
        return data.count * data.price;
    } else {                                        // if price is undefined then it means we should first calculate its
        let total = 0                               // price.
        data.items.forEach( ( item ) => {
            total = total + calculatePrice( item )
        } )

        return data.count * total
    }
}

function getAndCalculate( url ) {
    fetch( url )
        .then( data => {
            if ( data ) {                           // if data exist
                console.log( "< " + url + " >  => " + calculatePrice( data ) )
            } else {                                // if data is not exist
                console.log( "Data can not be taken!" )
            }
        } )
}

// first request
getAndCalculate( url1 )

// second request
getAndCalculate( url2 )

// third request
getAndCalculate( url3 )

