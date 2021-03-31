const { version } = require("chromedriver");

// src folders can change depending on the tests you'd like to run. target the correct one or you'll have a bad time.
nightwatch_config = {
  src_folders : [ "tests/patient" ],

  custom_commands_path: ["./commands"],
  page_objects_path: ["pages"],

  //global variables used in tests
  globals: {
    env: "release",
    handle: "omega",
    email:"taylor+o14@evisit.com",
    password:"Patient123!",
    providerEmail: "taylor+provider@evisit.com",
    providerPassword: "Provider123!"
  },

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

  //Insert capabilities you'd like to use globally across browsers
  common_capabilities: {
    'build': 'nightwatch-browserstack',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'nick34',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'SBukT13jtljJiBWoBpHw',
    'browserstack.debug': true,
    'browserstack.timezone' : "Phoenix",
    'browserstack.geoLocation' : "BR",
  },

  test_settings: {
    default: {},

    chrome: {
      desiredCapabilities: {
        browser: "chrome",
        version: "89.0",
        os: "Windows",
        os_version: "10"
        //resolution: '1024x768'
        
      }
    },
    firefox: {
      desiredCapabilities: {
        browser: "firefox",
        version: "87.0",
        os: "OS X",
        os_version: "Big Sur"
      }
    },
    safari: {
      desiredCapabilities: {
        browser: "safari"
      }
    },
    ie: {
      desiredCapabilities: {
        browser: "internet explorer"
      }
    }
  }
}




// Code to support common capabilites
for(var i in nightwatch_config.test_settings){
  var config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for(var j in nightwatch_config.common_capabilities){
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;
