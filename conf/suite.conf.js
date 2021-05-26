nightwatch_config = {
  src_folders : [ "tests/patient", "tests/provider" ],
  
  custom_commands_path: ["./commands"],
  page_objects_path: ["pages"],

  globals: {
    env: "app",
    handle: "omega",
    email:"taylor+o14@evisit.com",
    password:"admin:mtaylor@evisit.com:mt4yl0r1320#!",
    providerEmail: "taylor+provider@evisit.com",
    providerPassword: "admin:mtaylor@evisit.com:mt4yl0r1320#!",
  },

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 443 //HTTP - Port 80 / SSL - Port 443
  },

  common_capabilities: {
    skip_testcases_on_fail: false,
    'build': 'nightwatch-browserstack',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'nick34',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'SBukT13jtljJiBWoBpHw',
    "browserstack.autoWait": 20,
    'build' : 'eVisit Test Suite',
    'project' : 'Nightwatch',
    'browserstack.debug': true,
    'browserstack.timezone' : "Phoenix",
    //'browserstack.geoLocation' : "BR",
    'os_version': 'Big Sur',
    'browser': 'Chrome',
    'browser_version': 'latest',
    'resolution': '1920x1080',
    'os': 'OS X',
    'debug': true,
    'browserstack.networkLogs': true,
  },

  test_settings: {
    default: {
    //   desiredCapabilities: {
    //     'goog:chromeOptions': {
    //       'args': ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"],
    //       prefs: {
    //         // disable geolocation  - only required for browserstack
    //         // 0 - Default, 1 - Allow, 2 - Block
    //         //'profile.managed_default_content_settings.geolocation' : 1
    //       }
    //     }
    // },
  }
}}

// Code to copy seleniumhost/port into test settings
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
