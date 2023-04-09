# Weather app CMD

## Description

This small program utilizes the command line to get weather statistics in the desired area

## How to use

When running and prompted to input a location, all you need to do is input a valid city name or zip code

After doing so, you will recieve an output like this:

(input was Seattle)

```Location: Seattle, Washington - USA
Sun Apr 09 2023 11:24:09 GMT-0700 (Pacific Daylight Time)
----------------------

Weather description - Light Rain
Current tempurature - 50 degrees fahrenheit
                      10 degrees celcius

```
## Set up requirements

API used is from: `https://weatherstack.com/`
- You must create an account in order to recieve an API access key

Once you have recieved your access key, follow these steps:

1. In the same directory as `weatherApp.js`, create a new file called `config.js`
2. Within `config.js` add this code:

```
module.exports = {
  HIDDEN_VALUES: {
    access_key: <Access_key goes in here>
  }
}
```
3. Save your `config.js` file
4. Run `node weatherApp.js`