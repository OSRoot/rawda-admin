import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mdsoft.rawda.admin',
  appName: 'RawdaAdmin',
  webDir: 'www',
  // backgroundColor: "#154875",
  // loggingBehavior:'production',
  bundledWebRuntime:false,
  server: {
    cleartext: true,
    allowNavigation: ['*'],
  },
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": false,
      "showSpinner": false,
      "androidScaleType":"CENTER_CROP",
      "splashFullScreen":true,
      "launchFadeOutDuration":1000
    },
    "Keyboard": {
      "resize": "body",
      "style": "DARK",
      "resizeOnFullScreen": true
    }
  }
};

export default config;
