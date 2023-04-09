const cf = require('./config.js');
const axios = require('axios');
const readline = require('readline-sync');

class WeatherDB {
  static URL = 'http://api.weatherstack.com/';
  static fahrenheit(celcius) {
    return (1.8 * celcius) + 32;
  }

  constructor(accessKey) {
    this.accessKey = accessKey;
    this.locationSearch = 'none';
    this.currentSearch = null;
  }

  getData() {
    let self = this;
    return axios.get(`${WeatherDB.URL}current?access_key=${this.accessKey}&query=${this.locationSearch}`)
    .then(function (response) {
      self.currentSearch = response.data;
    });
  }
}

class Session {
  constructor(db) {
    this.db = db;
  }

  welcome() {
    console.log('Welcome to the WeatherApp!');
  }

  locationInput() {
    console.log('Input a location: ');
    let location = readline.question();
    console.log();
    this.db.locationSearch = location;
  }

  displayWeather() {
    console.clear();
    let self = this;
    return this.db.getData()
      .then(function() {
        let weatherObj = self.db.currentSearch;
        let location = weatherObj.location;
        let current = weatherObj.current;

        console.log(`Location: ${location.name}, ${location.region} - ${location.country}`);
        console.log(Date());
        console.log('----------------------');
        console.log();
        console.log(`Weather description - ${current.weather_descriptions[0]}`);
        console.log(`Current tempurature - ${WeatherDB.fahrenheit(current.temperature)} degrees fahrenheit`);
        console.log(`                      ${current.temperature} degrees celcius`);

      });
  }

  run() {
    this.welcome();
    this.locationInput()
    this.displayWeather();
  }
}

const ACCESS_KEY = cf.HIDDEN_VALUES.access_key;
const weatherApi = new WeatherDB(ACCESS_KEY);
const session = new Session(weatherApi);

session.run();