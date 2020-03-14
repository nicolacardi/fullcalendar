import { Component, OnInit, Input } from '@angular/core';
import { InterventoTipo } from '../models/models';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { InterventoDialogComponent } from '../intervento-dialog/intervento-dialog.component';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-interventi',
  templateUrl: './interventi.component.html',
  styleUrls: ['./interventi.component.css']
})
export class InterventiComponent implements OnInit {

  @Input()
  interventi: InterventoTipo[];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {

//  new Date(0).setUTCSeconds(YOURFIREBASEDOC.updatedAt['seconds'])

  }

  editIntervento(intervento: InterventoTipo){
    const dialogConfig = new MatDialogConfig();
    //ecco qui di seguito cosa passo alla Dialog: due impostazioni e dei dati
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = intervento;
    this.dialog.open(InterventoDialogComponent, dialogConfig)
  }

}
