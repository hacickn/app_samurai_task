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
            url: url, // change url parameter respectively!
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        } )
        .then( async function ( response ) {
            if ( response.status === 200 ) {
                return response.data
            } else {
                console.log( response.status + " code is taken!" )
                return null
            }
        } )
        .catch( async function ( error ) {
            console.log( error.message )
            return null
        } );
}

function calculatePrice( data ) {
    if ( data.price !== undefined ) {
        return data.count * data.price;
    } else {
        let total = 0
        data.items.forEach( ( item ) => {
            total = total + calculatePrice( item )
        } )

        return data.count * total
    }
}

function getAndCalculate( url ) {
    fetch( url )
        .then( data => {
            if ( data ) {
                console.log( "< " + url + " >  => " + calculatePrice( data ) )
            } else {
                console.log( "Data can not be taken!" )
            }
        } )
}

getAndCalculate( url1 )
getAndCalculate( url2 )
getAndCalculate( url3 )

