const request = require('request');

const forecast = (long, lat, callback) => {
const url = "http://api.weatherstack.com/current?access_key=e0221249cfc8e674aefd241e655f0536&query=" + long + "," + lat + "&units=f";
request({url, json: true}, (e,{body} = {})=>{
    if(e){
        callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
        callback('Unable to find location!', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.');
    }
});
};

module.exports = forecast;