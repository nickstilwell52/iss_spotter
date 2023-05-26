/*
const { fetchMyIP } = require('./iss');
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});
*/


/*
const { fetchCoordsByIP } = require('./iss');
fetchCoordsByIP('123.123.123.123', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , data);
});
*/


const { fetchISSFlyOverTimes } = require('./iss');
fetchISSFlyOverTimes({ longitude: 116.407395, latitude: 39.904211 }, (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned Flyover Times:' , data.response);
});


