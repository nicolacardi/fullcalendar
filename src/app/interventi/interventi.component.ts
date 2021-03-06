import { Component, OnInit, Input, Output } from '@angular/core';
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

  @Output()
  interventoEdited = false;
  ;
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
      // .afterClosed()
      // //afterClosed restituisce  this.form.value infatti sulla dialog è scritto
      // //() => this.dialogRef.close(this.form.value)
      // .subscribe ( val => {
      //   if (val) {
      //     this.interventoEdited.emit();
      //   }

      // }
      // )
    ;
  }

}
