import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {InterventoTipo} from "../models/models";
import {Observable, of} from 'rxjs';
import { InterventiService } from './interventi.service';

//questo servizio restituisce il corso su cui si è fatto clic
@Injectable()
export class InterventoResolver implements Resolve<InterventoTipo> {

    constructor( private interventiService: InterventiService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InterventoTipo> {
        const NIntervento = route.paramMap.get('NIntervento'); 
        
        //il valore di NIntervento viene preso dal routing, vedi file app.routing-module.ts
        //a questo punto dentro NIntervento c'è una stringa
        //che passo al service per ottenere il record

        return this.interventiService.findNIntervento(NIntervento);

    }

}
