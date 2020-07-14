const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=f643d2f952194de1877203516200807&q=" +
    latitude +
    "," +
    longitude;

  //console.log(url);
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Oops! server mistake");
    } else if (response.body.location === undefined) {
      callback(
        "I think there must be something with the coordinates",
        undefined
      );
    } else {
      const { temp_c, precip_in } = response.body.current;

      const { name } = response.body.location;
      //console.log(response.body.location.name);

      callback(undefined, {
        name: response.body.location.name,
        temp_c: response.body.current.temp_c,
        precip_in: response.body.current.precip_in,
      });
    }
  });
};

module.exports = forecast;
