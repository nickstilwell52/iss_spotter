const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      return callback(error,body);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(error,ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = 'http://ipwho.is/' + ip;
  request(url, (error, response, body) => {
    if (error) {
      callback(error,body);
      return;
    }
    // parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const coords = {
      longitude: parsedBody.longitude,
      latitude: parsedBody.latitude
    };
    callback(error,coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const lon = coords.longitude;
  const lat = coords.latitude;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error,body);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching flyover times: ${body}`), null);
      return;
    }
    const parsedBody = JSON.parse(body);
    callback(error,parsedBody);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error) {
      return console.log("It didn't work!" , error);
    }
    fetchCoordsByIP(ip, (error,coords) => {
      if (error) {
        return console.log("It didn't work!" , error);
      }
      fetchISSFlyOverTimes(coords, (error,flyTimes) => {
        if (error) {
          return console.log("It didn't work!" , error);
        }
        callback(error, flyTimes);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };