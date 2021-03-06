import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { AssistenzaComponent } from './assistenza/assistenza.component';
import { DialogEvent } from './calendar/calendar.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { MatTableModule} from '@angular/material/table'
import { MatPaginatorModule} from '@angular/material/paginator'
import { MatSortModule} from '@angular/material/sort'
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment'

import { ClientiComponent } from './clienti/clienti.component';
import { ClienteComponent } from './clienti/cliente/cliente.component';
import { ClienteService } from './shared/cliente.service';
import { AnagraficaClientiComponent } from './clienti/anagrafica-clienti/anagrafica-clienti.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgUnivComponent } from './ng-univ/ng-univ.component';
import { NgUniv2Component } from './ng-univ2/ng-univ2.component';
import { InterventiComponent } from './interventi/interventi.component';
import { InterventoComponent } from './intervento/intervento.component';
import { InterventoResolver } from "./shared/intervento.resolver";

import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { InterventoDialogComponent } from './intervento-dialog/intervento-dialog.component';
import { BatchComponent } from './batch/batch.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';


@NgModule({
  declarations: [
    LoginComponent,     //AS
    AppComponent,
    DialogEvent,
    CalendarComponent,
    AssistenzaComponent,
    ClientiComponent,
    ClienteComponent,
    AnagraficaClientiComponent,
    ConfirmDialogComponent,
    NgUnivComponent,
    NgUniv2Component,
    InterventiComponent,
    InterventoComponent,
    InterventoDialogComponent,
    BatchComponent,
    ReactiveformComponent,
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
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [ 
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    ClienteService,
    InterventoResolver,
    AngularFireAuth
],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogEvent,
    ClienteComponent,
    AppComponent,
    ConfirmDialogComponent
  ]
})
export class AppModule {
 }


