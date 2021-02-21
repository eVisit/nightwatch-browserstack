nightwatch_config = {
  src_folders : [ "tests/patient" ],

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80 //HTTP - Port 80 / SSL - Port 443
  },

  test_settings: {
    default: {
      skip_testcases_on_fail: false, //Do not skip remaining tests in case one of them fail
      desiredCapabilities: {
        'browserstack.user': 'nick34',
        'browserstack.key': 'SBukT13jtljJiBWoBpHw',
        //"browserstack.timezone" : "Sao_Paulo",
        "browserstack.timezone" : "Phoenix",
        "browserstack.geoLocation" : "BR",    // Force geolocation page to appear for patient
        'os': 'OS X',
        'debug': true,
        'networkLogs': true,
        'os_version': 'Mojave',
        'build' : 'Patient Tests',
        'project' : 'eVisit Nightwatch',
        'browser': 'Chrome',
        'browser_version': '87.0',
        'resolution': '1920x1080',
        'goog:chromeOptions': {
          'args': ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"],
          prefs: {
            // disable geolocation  - only required for browserstack
            // 0 - Default, 1 - Allow, 2 - Block
            'profile.managed_default_content_settings.geolocation' : 1
          }
        }
    },
    globals: {
        env: "app",
        handle: "omega",
        email:"taylor+o14@evisit.com",
        password:"Patient123!",
        providerEmail: "taylor+provider@evisit.com",
        providerPassword: "Provider123!"
      },
  }
},
custom_commands_path: ["./commands"],
page_objects_path: ["pages"]
};

// Code to copy seleniumhost/port into test settings
for(var i in nightwatch_config.test_settings){
  var config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;
