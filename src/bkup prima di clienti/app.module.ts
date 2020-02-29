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
import { DialogEvent } from './calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CalendarComponent } from './calendar/calendar.component';
import { AssistenzaComponent } from './assistenza/assistenza.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ClientiComponent } from './clienti/clienti.component';



@NgModule({
  declarations: [
    AppComponent,
    DialogEvent,
    CalendarComponent,
    AssistenzaComponent,
    ClientiComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [ 
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogEvent,
    AppComponent
  ]
})
export class AppModule {
 }


