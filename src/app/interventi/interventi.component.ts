import { Component, OnInit, Input } from '@angular/core';
import { InterventoTipo } from '../models/models';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { InterventoDialogComponent } from '../intervento-dialog/intervento-dialog.component';

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
  }

  editIntervento(intervento: InterventoTipo){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = intervento;
    this.dialog.open(InterventoDialogComponent, dialogConfig)


  }

}
