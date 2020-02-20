import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DialogEvent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DialogData } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogEvent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogEvent
  ]
})
export class AppModule {
 }


//  import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     FullCalendarModule // import the FullCalendar module! will make the FullCalendar component available
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }