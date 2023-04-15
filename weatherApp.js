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

  async getData() {
    try {
      const response = await axios.get(`${WeatherDB.URL}current?access_key=${this.accessKey}&query=${this.locationSearch}`);
      this.currentSearch = response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

class Session {
  constructor(db) {
    this.db = db;
    this.proceed = true;
  }

  enterDelay() {
    console.log('Press enter to continue...');
    readline.question('');
  }

  welcome() {
    console.log('Welcome to the WeatherApp!');
    console.log('');
    this.enterDelay();
    console.clear();
  }

  goodbye() {
    console.log('Have a great day!');
  }

  locationInput() {
    console.log('Input a location (or "end" to exit): ');
    let location = readline.question();
    console.log("");
    if (location.toLowerCase() === 'end') {
      this.proceed = false;
    } else {
      this.db.locationSearch = location;
    }
  }

  async displayWeather() {
    console.clear();
    await this.db.getData();
    let weatherObj = this.db.currentSearch;
    if (weatherObj.error) {
      console.log('Please specify a valid location identifier.');
    } else {
      let location = weatherObj.location;
      let current = weatherObj.current;

      console.log(`Location: ${location.name}, ${location.region} - ${location.country}`);
      console.log(Date());
      console.log('----------------------');
      console.log();
      console.log(`Weather description - ${current.weather_descriptions[0]}`);
      console.log(`Current temperature - ${WeatherDB.fahrenheit(current.temperature)} degrees fahrenheit`);
      console.log(`                      ${current.temperature} degrees Celsius`);
      console.log('');
    }
    
  }

  checkProceed() {
    return this.proceed;
  }

  async run() {
    this.welcome();
    while (true) {
      this.locationInput();
      if (!this.checkProceed) break;
      await this.displayWeather();
    }
    this.goodbye();
  }
}

const ACCESS_KEY = cf.HIDDEN_VALUES.access_key;
const weatherApi = new WeatherDB(ACCESS_KEY);
const session = new Session(weatherApi);

session.run();