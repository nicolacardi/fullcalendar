import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { AssistenzaComponent } from './assistenza/assistenza.component';
import { ClientiComponent } from './clienti/clienti.component';
import { AnagraficaClientiComponent } from './clienti/anagrafica-clienti/anagrafica-clienti.component';

const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: 'calendario', component: CalendarComponent },
  // { path: 'assistenza', component: AssistenzaComponent },
  //{ path: 'cliente', component: ClientiComponent },
  { path: 'anagrafica clienti', component: AnagraficaClientiComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
