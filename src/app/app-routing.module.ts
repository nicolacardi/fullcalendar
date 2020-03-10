import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { AssistenzaComponent } from './assistenza/assistenza.component';
import { ClientiComponent } from './clienti/clienti.component';
import { AnagraficaClientiComponent } from './clienti/anagrafica-clienti/anagrafica-clienti.component';
import { NgUnivComponent } from './ng-univ/ng-univ.component';
import { NgUniv2Component } from './ng-univ2/ng-univ2.component';
import { InterventoComponent } from './intervento/intervento.component';
import { InterventoResolver } from "./shared/intervento.resolver";
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'calendario', component: CalendarComponent },
  
  { path: 'anguniv', component: NgUnivComponent },
  { path: 'anguniv2', component: NgUniv2Component },
  { path: 'anagrafica clienti', component: AnagraficaClientiComponent },

  { path: 'assistenza', component: AssistenzaComponent },
  { path: 'assistenza/:NIntervento',
    component: InterventoComponent,
    resolve: {
      intervento: InterventoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
