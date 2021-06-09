module.exports = 

{
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders : [ "tests/patient", "tests/provider" ],
  webdriver: {
    start_process: true,
    port: 9515,
    server_path: require('chromedriver').path, // Downloaded by 'npm install'
  },
  test_settings: {
    default: {
      skip_testcases_on_fail: false, // Do not skip remaining tests in case one of them fail
      launch_url: 'https://nightwatchjs.org',
      desiredCapabilities: {
        browserName: 'chrome',
        browserVersion: 'latest',
        // Disable geolocation - only required for browserstack
        "chromeOptions": {
          prefs: {
            "args" : 
            [
              "--headless",
              "ignore-certificate-errors",
              "disable-gpu",
              "disable-gpu",
              "no-sandbox",
            ],
            "binary": "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
            // 0 - Default, 1 - Allow, 2 - Block
            'profile.managed_default_content_settings.geolocation': 1
          }
        }
      },
      globals: { // Variables that can be used by any test
        env: "release",
        handle: "omega",
        email: "taylor+o14@evisit.com",
        password: "admin:mtaylor@evisit.com:mt4yl0r1320#!",
        providerEmail: "taylor+provider@evisit.com",
        providerPassword: "admin:mtaylor@evisit.com:mt4yl0r1320#!"
      },
    }
  },
  custom_commands_path: ["./commands"], // Custom commands folder
  page_objects_path: ["pages"] // Page object folder
};
//Local
//nightwatch --test ./tests/provider/visit-history_test.js  
//BS
// nightwatch -c ./conf/patient.conf.js -t tests/patient/<test_folder>/<test_sub_folder>/<test_file.js>
// nightwatch -c ./conf/provider.conf.js -t tests/provider/     <test>
//nightwatch -c ./conf/patient.conf.js  -t tests/patient/<test_folder>/<test_sub_folder>/<test_file.js>  --testcase "<name of test case>" 