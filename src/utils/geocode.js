const request = require("request");

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoibmVldHNhYmhhcndhbCIsImEiOiJjbGZvZnAwdnYwZ3BqM3Vwamh6aDZ4ZXRxIn0.9_CcjMVX0fWdPL2ksR3Obw&limit=1";
  
    request({ url, json: true }, (e, {body} = {}) => {
      if(e){
          callback('Unable to connect to location services!', undefined);
      } else if (body.features.length === 0){
          callback('Unable to find location!', undefined);
      } else {
          callback(undefined, {
              lat : body.features[0].center[1],
              long : body.features[0].center[0],
              location: body.features[0].place_name
          });
      }
    });
  };

module.exports = geocode;