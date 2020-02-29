import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { AssistenzaComponent } from './assistenza/assistenza.component';
import { ClientiComponent } from './clienti/clienti.component';

const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: 'calendario', component: CalendarComponent },
  { path: 'assistenza', component: AssistenzaComponent },
  { path: 'clienti', component: ClientiComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
