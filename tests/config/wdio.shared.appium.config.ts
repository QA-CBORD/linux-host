import { config } from './wdio.shared.config';

//
// =====================
// Server Configurations
// =====================
//
// The server port Appium is running on
//
config.port = 4724;

//
// ================
// Services: Appium
// ================
//
config.services = (config.services ? config.services : []).concat([
  [
    'appium',
    {
      // This will use the globally installed version of Appium
      command: 'appium',
      args: {
        address: '0.0.0.0',  
        port: 4723,
        // This is needed to tell Appium that we can execute local ADB commands
        // and to automatically download the latest version of ChromeDriver
        relaxedSecurity: true,
        // Only log Appium logs in verbose mode
        ...(process.env.VERBOSE === 'true' ? { log: './appium.log' } : {}),
      },
    },
  ],
]);

export default config;
