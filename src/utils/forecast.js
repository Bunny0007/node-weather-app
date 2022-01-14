const request = require('request');
const foreCast = (latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=8d6dfdd52b6821f072e3a44a4d23e082&query=${latitude},${longitude}`;

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weatherstack API');
        }else if(response.body.error){
            callback('Unable To find location')
        }else{
            callback(undefined,`${response.body.current.weather_descriptions}. Its ${response.body.current.temperature} out there but it feels like ${response.body.current.feelslike}`)
        }
    })
}

module.exports = foreCast;