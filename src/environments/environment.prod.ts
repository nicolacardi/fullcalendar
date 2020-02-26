export const environment = {
  production: true,
  
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
