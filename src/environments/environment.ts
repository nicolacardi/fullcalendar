// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig : {
    apiKey: "AIzaSyCANsbPVvSPmFOKgapordcWCa63VCU2feE",
    authDomain: "myfirebase-83554.firebaseapp.com",
    databaseURL: "https://myfirebase-83554.firebaseio.com",
    projectId: "myfirebase-83554",
    storageBucket: "myfirebase-83554.appspot.com",
    messagingSenderId: "411638616069",
    appId: "1:411638616069:web:e10a0cbb1ffe59d21e8c6c",
    measurementId: "G-QDCRH2TG1B"
  },

  fullcalendarConfig : {
    buttonText : {
        today:    'oggi',
        month:    'mese',
        week:     'settimana',
        day:      'giorno',
        list:     'lista'
    },
    header : {
      left: 'title',
      center: 'prev,next today',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    defaultAllDayEventDuration : {
    days: 1
    },
    nowIndicator : true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
