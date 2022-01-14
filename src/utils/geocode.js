const request = require('request');

const Geocode = (address,callback)=>{
  
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2hpdjAwNyIsImEiOiJja3Jub3YycTcxdmhqMnVydm0zODU4amp2In0.Cu2GU49QeMusrSqAoBkxLg&limit=1";
    request({url:url,json:true},(error,response)=>{
  
      if(error){
        callback('Unable to connect to API');
      }else if(response.body.features.length === 0){
        callback('No matching results found');
      }else{
        callback(undefined,{
            latitude :  response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            place_name: response.body.features[0].place_name
        });
      }
    })
  }
  module.exports = Geocode;