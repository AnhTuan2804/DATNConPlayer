// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    appConfig: {
      apiKey: "AIzaSyC5UHVDYOkH5aAMyHi2W2q8qL2ZCbgm5gM",
      authDomain: "datncsplayer.firebaseapp.com",
      databaseURL: "https://datncsplayer.firebaseio.com",
      projectId: "datncsplayer",
      storageBucket: "datncsplayer.appspot.com",
      messagingSenderId: "24905739904"
    }
  },
  encodeDecode: {
    baseSecret: "fsdfsdfsdfsdgvzxbcvnvbmfghfdyertegsdfdjghhhhyujhfdhsgdfgdfgdfhdfhfhfghfghgf128763912",
    baseContent: "TXtAzPOfceGVhQoYygxaldCMNZjnwvUpIEHFSbLKRBWJrmquDski",
    lengthBaseContent: 52
  },
  routerLoginAdmin: "abc",
  host: "http://127.0.0.1:8088/api",
  // host: "https://datncsplayer.herokuapp.com/api",
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import "zone.js/dist/zone-error";  // Included with Angular CLI.
