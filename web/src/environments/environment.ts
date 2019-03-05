// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    appConfig: {
      apiKey: "AIzaSyDwrAwEFF6sCDaUAhoj2OoHtIa4XmQuJ4U",
      authDomain: "gcctoken.firebaseapp.com",
      databaseURL: "https://gcctoken.firebaseio.com",
      projectId: "gcctoken",
      storageBucket: "gcctoken.appspot.com",
      messagingSenderId: "903879673923"
    }
  },
  encodeDecode: {
    baseSecret: "fsdfsdfsdfsdgvzxbcvnvbmfghfdyertegsdfdjghhhhyujhfdhsgdfgdfgdfhdfhfhfghfghgf128763912",
    baseContent: "TXtAzPOfceGVhQoYygxaldCMNZjnwvUpIEHFSbLKRBWJrmquDski",
    lengthBaseContent: 52
  },
  routerLoginAdmin: "abc",
  // host: "http://127.0.0.1:8017",
  host: "http://gcc.global-ibk.com:8017",
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import "zone.js/dist/zone-error";  // Included with Angular CLI.
