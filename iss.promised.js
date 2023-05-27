const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const coords = JSON.parse(body)
  const lon = coords.longitude;
  const lat = coords.latitude;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      let passTimes = JSON.parse(data).response;
      return passTimes;
    });
};

module.exports = { nextISSTimesForMyLocation };