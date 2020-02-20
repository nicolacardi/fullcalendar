import { Component, OnInit, Inject, ViewChild, AfterViewInit} from '@angular/core';
import dayGridPlugin  from '@fullcalendar/daygrid';
import listWeekPlugin  from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import it from '@fullcalendar/core/locales/it';
import { Calendar } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import * as $ from 'jquery';
import { OptionsInput } from '@fullcalendar/core/types/input-types';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

//creo un tipo di dati che userò per portare i dati alle due Dialog
export interface DialogData {
  date: string
}

export interface DialogEvent {
  id: number
  date: string,
  title: string,
  color: string,
  allDay: boolean,
  startTime: string,
  endTime: string,
  start: Date,
  end: Date,
  showDel: boolean
}

export interface ResultType {
  title: string,
  color: string,
  startTime?: String,
  endTime?: String,
  start: Date,
  end: Date
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  it = it;
  //la seguente variabile definisce un array necessario per stabilire quali viste sono disponibili
  //viene pescata nell'html da [plugins]="calendarPlugins"



  public calendarPlugins = [dayGridPlugin, timeGridPlugin, listWeekPlugin, interactionPlugin];
  calendarWeekends = true;

  constructor(public dialog: MatDialog) {}

  //eventi base inseriti nel calendario
  //calendarEvents: any;
  impostaData1 = new Date('Wed Feb 05 2020 10:00:00 GMT+0100');
  impostaData2 = new Date('Wed Feb 06 2020 08:00:00 GMT+0100');
  calendarEvents= 
    [
      {
        id: 1,
        title: 'Dentista',
        date: '2020-02-05',
        color: '#7fff64',
        allDay: false,
        start: this.impostaData1,
        end: this.impostaData2
      },
  ];
  
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  

  ngOnInit() {

    //aggiungo eventi al calendario
    // this.calendarEvents = this.calendarEvents.concat([ 
    //   { id:3, title: 'Padel', date: '2020-02-05', color: 'lightblue', allDay: true, start: '2020-02-05T00:00:00'},
    //   { id:4, title: 'Nuoto', date: '2020-02-06', color: 'yellow', allDay: true, start: '2020-02-06T00:00:00' },
    //   { id:5, title: 'Andare in montagna', date: '2020-02-06', color: 'orange', allDay: true, start: '2020-02-06T00:00:00' }
    // ]);

  }

  ngAfterViewInit(){
    //let calendario = this.calendarComponent.getApi(); 

  }

  //metto in due variabili la start e l'end dell'evento "prima" di spostarlo
  //serve per calcolare il timespan da riprodurre poi in quanto
  //non settare l'end determina diversi problemi
  //nel caso in cui sia null
  public beforeDragStart: Date;
  public beforeDragEnd: Date;
  eventDragStart(event) {
    this.beforeDragStart = event.event.start;
    this.beforeDragEnd = event.event.end;
  }
  eventDrop(event) {
    //let calendario = this.calendarComponent.getApi(); 
    //calendario.refetchEvents();
    //calendario.rerenderEvents(); //faccio il re-render ma il bug persiste
    //console.log("event @ drop");
    //console.log (event);
    //se la data finale è nulla prendo intanto come data finale quella iniziale + 1 giorno
    //(ogni data spostata si ritroverà con end non nulla dopo il drag.)
    if (this.beforeDragEnd == null) {
      this.beforeDragEnd = new Date(this.beforeDragStart);
      this.beforeDragEnd.setDate(this.beforeDragStart.getDate() + 1);
    }

    let startDate = new Date (event.event.start);
    let endDateNum : number;
    if (this.beforeDragEnd != null) {
      //sommo alla data startDate (che è = event.event.start) la differenza delle due date "prima" dello spostamento
      endDateNum = startDate.getTime() + this.beforeDragEnd.getTime() - this.beforeDragStart.getTime();
    }
    //ritraduco in una data
    let endDate = new Date (endDateNum);

    //assegno start e endDate
    this.calendarEvents.find(x => x.id == event.event.id).start = startDate;
    this.calendarEvents.find(x => x.id == event.event.id).end = endDate;


  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }


  
  newEvent(data) {
    console.log(data);
    //metto in colorcode il codice colore dell'evento. Se descrittivo lo traduco in un codice.
    let colorcode = "#7fff64";

    //estraggo dall'evento cliccato le altre proprietà da mostrare in Dialog
    let start = new Date(data.dateStr);
    let endNum = start.getTime()+86400000;
    let end = new Date(endNum);
    console.log("start"+start);
    console.log ("end"+end);

    let currentmaxid = 0;
    if (this.calendarEvents.length != 0) {
      currentmaxid = Math.max.apply(Math, this.calendarEvents.map(function(o) { return o.id; }));
    }

    //************************** APERTURA DELLA DIALOG **********************************
    const dialogRef = this.dialog.open(DialogEvent, {
      width: '450px',
      data: {
        id: (currentmaxid+1),       //id: any
        title: "Nuovo Evento",      //title: any
        color: colorcode,           //color: string
        allDay: true,  //allDay: any (perchè non boolean?)
        start: start,               //start: Date
        end: end,                   //end: Date
        startTime: "-",       //startTime: string
        endTime: "-",           //endTime: string
        showDel: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!= undefined){
        result as ResultType;

        let start: Date;
        let end: Date;
        if (!result.allDay) {
          let startTime = result.startTime;
          let hours = parseInt(startTime.substr(0,2));
          let min = parseInt(startTime.substr(3,2));
          let sec = parseInt(startTime.substr(4,2));
          result.start.setHours(hours, min, sec);
          start = result.start;
          let endCurrent=new Date(result.start);
          let endTime = result.endTime;
          hours = parseInt(endTime.substr(0,2));
          min = parseInt(endTime.substr(3,2));
          sec = parseInt(endTime.substr(4,2));
          endCurrent.setHours(hours, min, sec);
          end = endCurrent;
        } else {
          let startCurrent = result.start;
          let hours = 0;
          let min = 0;
          let sec = 0;
          startCurrent.setHours(hours, min, sec);
          start = startCurrent;
          end = null;
        }




        this.calendarEvents = this.calendarEvents.concat([
          {id: (currentmaxid+1),
          title: result.title,
          date: data.dateStr,
          color: result.color,
          allDay: result.allDay,
          start: start,
          end: end
        }
        ]);



      }
    });

  }


  
  clickEvent(event) {
    console.log(event);
    //metto in colorcode il codice colore dell'evento. Se descrittivo lo traduco in un codice.
    var colours = { 
    "aliceblue":"#f0f8ff", "antiquewhite":"#faebd7", "aqua":"#00ffff", "aquamarine":"#7fffd4", "azure":"#f0ffff",  "beige":"#f5f5dc", "bisque":"#ffe4c4", "black":"#000000", "blanchedalmond":"#ffebcd", "blue":"#0000ff", "blueviolet":"#8a2be2", "brown":"#a52a2a", "burlywood":"#deb887",  "cadetblue":"#5f9ea0", "chartreuse":"#7fff00", "chocolate":"#d2691e", "coral":"#ff7f50", "cornflowerblue":"#6495ed", "cornsilk":"#fff8dc", "crimson":"#dc143c", "cyan":"#00ffff",  "darkblue":"#00008b", "darkcyan":"#008b8b", "darkgoldenrod":"#b8860b", "darkgray":"#a9a9a9", "darkgreen":"#006400", "darkkhaki":"#bdb76b", "darkmagenta":"#8b008b", "darkolivegreen":"#556b2f",  "darkorange":"#ff8c00", "darkorchid":"#9932cc", "darkred":"#8b0000", "darksalmon":"#e9967a", "darkseagreen":"#8fbc8f", "darkslateblue":"#483d8b", "darkslategray":"#2f4f4f", "darkturquoise":"#00ced1",  "darkviolet":"#9400d3", "deeppink":"#ff1493", "deepskyblue":"#00bfff", "dimgray":"#696969", "dodgerblue":"#1e90ff",  "firebrick":"#b22222", "floralwhite":"#fffaf0", "forestgreen":"#228b22", "fuchsia":"#ff00ff",  "gainsboro":"#dcdcdc", "ghostwhite":"#f8f8ff", "gold":"#ffd700", "goldenrod":"#daa520", "gray":"#808080", "green":"#008000", "greenyellow":"#adff2f", 
    "honeydew":"#f0fff0", "hotpink":"#ff69b4", "indianred ":"#cd5c5c", "indigo":"#4b0082", "ivory":"#fffff0", "khaki":"#f0e68c",  "lavender":"#e6e6fa", "lavenderblush":"#fff0f5", "lawngreen":"#7cfc00", "lemonchiffon":"#fffacd", "lightblue":"#add8e6", "lightcoral":"#f08080", "lightcyan":"#e0ffff", "lightgoldenrodyellow":"#fafad2",  "lightgrey":"#d3d3d3", "lightgreen":"#90ee90", "lightpink":"#ffb6c1", "lightsalmon":"#ffa07a", "lightseagreen":"#20b2aa", "lightskyblue":"#87cefa", "lightslategray":"#778899", "lightsteelblue":"#b0c4de",  "lightyellow":"#ffffe0", "lime":"#00ff00", "limegreen":"#32cd32", "linen":"#faf0e6",  "magenta":"#ff00ff", "maroon":"#800000", "mediumaquamarine":"#66cdaa", "mediumblue":"#0000cd", "mediumorchid":"#ba55d3", "mediumpurple":"#9370d8", "mediumseagreen":"#3cb371", "mediumslateblue":"#7b68ee",        "mediumspringgreen":"#00fa9a", "mediumturquoise":"#48d1cc", "mediumvioletred":"#c71585", "midnightblue":"#191970", "mintcream":"#f5fffa", "mistyrose":"#ffe4e1", "moccasin":"#ffe4b5", "navajowhite":"#ffdead", "navy":"#000080",  "oldlace":"#fdf5e6", "olive":"#808000", "olivedrab":"#6b8e23", "orange":"#ffa500", "orangered":"#ff4500", "orchid":"#da70d6",  "palegoldenrod":"#eee8aa", 
    "palegreen":"#98fb98", "paleturquoise":"#afeeee", "palevioletred":"#d87093", "papayawhip":"#ffefd5", "peachpuff":"#ffdab9", "peru":"#cd853f", "pink":"#ffc0cb", "plum":"#dda0dd", "powderblue":"#b0e0e6", "purple":"#800080",  "rebeccapurple":"#663399", "red":"#ff0000", "rosybrown":"#bc8f8f", "royalblue":"#4169e1",  "saddlebrown":"#8b4513", "salmon":"#fa8072", "sandybrown":"#f4a460", "seagreen":"#2e8b57", "seashell":"#fff5ee", "sienna":"#a0522d", "silver":"#c0c0c0", "skyblue":"#87ceeb", "slateblue":"#6a5acd", "slategray":"#708090", "snow":"#fffafa", "springgreen":"#00ff7f", "steelblue":"#4682b4",   "tan":"#d2b48c", "teal":"#008080", "thistle":"#d8bfd8", "tomato":"#ff6347", "turquoise":"#40e0d0", "violet":"#ee82ee",   "wheat":"#f5deb3", "white":"#ffffff", "whitesmoke":"#f5f5f5", "yellow":"#ffff00", "yellowgreen":"#9acd32" 
      }; 
    let colorcode = "#000000";
    if (event.event.backgroundColor.substring(0,1)!="#") {
      colorcode = colours[event.event.backgroundColor.toLowerCase()]
    } else {
      colorcode = event.event.backgroundColor
    }
    

    //estraggo dall'evento cliccato le altre proprietà da mostrare in Dialog
    let start = new Date(event.event.start);
    let end = new Date(event.event.end);
    let startTime ="-";
    let endTime = "-";
    if (!event.event.allDay) {
      startTime = start.toLocaleTimeString('it-IT'); //estrae il Time da una data
      endTime = end.toLocaleTimeString('it-IT'); 
    }
    let s_day = ('0' + start.getDate()).slice(-2)
    let s_month = ('0' + (start.getMonth()+1)).slice(-2)
    let s_shortdate = start.getFullYear()+"-"+s_month+"-"+s_day;

    //usare una costante DialogRef consente istanziare la Dialog in modo da
    //'raccoglierne' la chiusura - inoltre con la seguente sintassi passo dei dati alla DialogEvent
    //************************** APERTURA DELLA DIALOG **********************************
    const dialogRef = this.dialog.open(DialogEvent, {
      width: '450px',
      data: {
        id: event.event.id,         //id: any
        date: s_shortdate,          //date: string (ATTENZIONE)
        title: event.event.title,   //title: any
        color: colorcode,           //color: string
        allDay: event.event.allDay, //allDay: any (perchè non boolean?)
        start: start,               //start: Date
        startTime: startTime,       //startTime: string
        endTime: endTime,           //endTime: string
        showDel: true
      }
    });
    console.log ("colorcode1:"+colorcode);

    





    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog Event ha restituito result: ");
      console.log(result);
      if (result!= undefined){
        //if (result.substr(0,6)=="delete"){
        //result può contenere:
        //O un array di di dati (title, color, startTime ecc)
        //oppure se siamo in cancellazione semplicemente la stringa delete##
        //dove ## è l'id dell'elemento da cancellare  
        //Se siamo nel primo caso allora start è sempre valorizzato, nel secondo mai.
        if (!result.start){
          let idToRemove = parseInt(result.substring(6));
          console.log("Sto per rimuovere dall'array l'elemento con id:"+idToRemove);
          this.calendarEvents.splice(this.calendarEvents.findIndex(v => v.id == idToRemove), 1);
        } else {
          result as ResultType;
          //ora devo modificare l'evento che ha id = result.id come da array result (result.title, result.color, ecc.)
          this.calendarEvents.find(x => x.id == result.id).title = result.title;

          this.calendarEvents.find(x => x.id == result.id).color = result.color;

          if (!result.allDay) {
            let startTime = result.startTime;
            let hours = parseInt(startTime.substr(0,2));
            let min = parseInt(startTime.substr(3,2));
            let sec = parseInt(startTime.substr(4,2));
            result.start.setHours(hours, min, sec);
            this.calendarEvents.find(x => x.id == result.id).start = result.start;
            let endCurrent=new Date(result.start);
            let endTime = result.endTime;
            hours = parseInt(endTime.substr(0,2));
            min = parseInt(endTime.substr(3,2));
            sec = parseInt(endTime.substr(4,2));
            endCurrent.setHours(hours, min, sec);
            this.calendarEvents.find(x => x.id == result.id).end = endCurrent;
          } else {
            let startCurrent = result.start;
            let hours = 0;
            let min = 0;
            let sec = 0;
            startCurrent.setHours(hours, min, sec);
            this.calendarEvents.find(x => x.id == result.id).start = startCurrent;
            this.calendarEvents.find(x => x.id == result.id).end = null;
          }
          this.calendarEvents.find(x => x.id == result.id).allDay = result.allDay;
        
        }
      }
    });
  }
}


//*************************************************************************************
//********************************DIALOG DATA******************************************
//separatamente si crea un altro @Component per la dialog
@Component({
  selector: 'dialogData',
  templateUrl: 'dialogData.html',
  styleUrls: ['./app.component.css']
})
export class DialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}



class timesArray {
  constructor(public timeString: string, public timeToShow: string) { }
}
//*************************************************************************************
//********************************DIALOG EVENT*****************************************
//separatamente si crea un altro @Component per la dialog
@Component({
  selector: 'dialogEvent',
  templateUrl: 'dialogEvent.html',
  styleUrls: ['./app.component.css']
})

export class DialogEvent{

  constructor(
  public dialogRef: MatDialogRef<DialogEvent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogEvent) {}
  
  timesArray: timesArray[] = [
    new timesArray("06:00:00", "06:00"),
    new timesArray("06:30:00", "06:30"),
    new timesArray("07:00:00", "07:00"),
    new timesArray("07:30:00", "07:30"),
    new timesArray("08:00:00", "08:00"),
    new timesArray("08:30:00", "08:30"),
    new timesArray("09:00:00", "09:00"),
    new timesArray("09:30:00", "09:30"),
    new timesArray("10:00:00", "10:00"),
    new timesArray("10:30:00", "10:30"),
    new timesArray("11:00:00", "11:00"),
    new timesArray("11:30:00", "11:30"),
    new timesArray("12:00:00", "12:00"),
    new timesArray("12:30:00", "12:30"),
    new timesArray("13:00:00", "13:00"),
    new timesArray("13:30:00", "13:30"),
    new timesArray("14:00:00", "14:00"),
    new timesArray("14:30:00", "14:30"),
    new timesArray("15:00:00", "15:00"),
    new timesArray("15:30:00", "15:30"),
    new timesArray("16:00:00", "16:00"),
    new timesArray("16:30:00", "16:30"),
    new timesArray("17:00:00", "17:00"),
    new timesArray("17:30:00", "17:30"),
    new timesArray("18:00:00", "18:00"),
    new timesArray("18:30:00", "18:30"),
    new timesArray("19:00:00", "19:00"),
    new timesArray("19:30:00", "19:30"),
    new timesArray("20:00:00", "20:00"),
    new timesArray("20:30:00", "20:30"),
    new timesArray("21:00:00", "21:00"),
    new timesArray("21:30:00", "21:30"),
    new timesArray("22:00:00", "22:00"),
    new timesArray("22:30:00", "22:30"),
    new timesArray("23:00:00", "23:00"),
    new timesArray("23:30:00", "23:30"),
  ];
  
  deleteEvent(){
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


// import { Component, ViewChild } from '@angular/core';
// import { FullCalendarComponent } from '@fullcalendar/angular';
// import { EventInput } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGrigPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction'; // for dateClick

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {

//   @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

//   calendarVisible = true;
//   calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
//   calendarWeekends = true;
//   calendarEvents: EventInput[] = [
//     { title: 'Event Now', start: new Date() }
//   ];

//   toggleVisible() {
//     this.calendarVisible = !this.calendarVisible;
//   }

//   toggleWeekends() {
//     this.calendarWeekends = !this.calendarWeekends;
//   }

//   gotoPast() {
//     let calendarApi = this.calendarComponent.getApi();
//     calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
//   }

//   handleDateClick(arg) {
//     if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
//       this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
//         title: 'New Event',
//         start: arg.date,
//         allDay: arg.allDay
//       })
//     }
//   }

// }




//per estrarre la shortdate si può fare così
    // let s_day = ('0' + start.getDate()).slice(-2)
    // let s_month = ('0' + (start.getMonth()+1)).slice(-2)
    // let s_shortdate = start.getFullYear()+"-"+s_month+"-"+s_day;
