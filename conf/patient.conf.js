nightwatch_config = {
    src_folders : [ "tests/patient" ],
  
    selenium : {
      "start_process" : false,
      "host" : "hub-cloud.browserstack.com",
      "port" : 80
    },
  
    test_settings: {
      default: {
        desiredCapabilities: {
          'browserstack.user': 'nick34',
          'browserstack.key': 'SBukT13jtljJiBWoBpHw',
          'os': 'OS X',
          'os_version': 'Mojave',
          'name' : 'Enroll a new patient',
          'build' : '1.0',
          'browser': 'Chrome',
          'browser_version': '78.0 beta',
          'resolution': '1920x1080'
        }
      }
    }
  };
  
  // Code to copy seleniumhost/port into test settings
  for(var i in nightwatch_config.test_settings){
    var config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;
  }
  
  module.exports = nightwatch_config;
  