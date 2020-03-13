import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InterventoTipo } from '../models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterventoResolver } from '../shared/intervento.resolver';

@Component({
  selector: 'app-intervento-dialog',
  templateUrl: './intervento-dialog.component.html',
  styleUrls: ['./intervento-dialog.component.css']
})
export class InterventoDialogComponent implements OnInit {
  form: FormGroup;
  tipiArray = ['Meccanico', 'Elettrico', 'Idraulico', 'Carrozzeria'];
  operators = ['Nicola Cardi', 'Andrea Svegliado', 'Giulio Costacurta', 'Matteo Cardi'];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InterventoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) intervento: InterventoTipo) {
      
      const nIntervento = intervento.NIntervento;
      const modello = intervento.Modello;
      const dataIntervento =  intervento.DataIntervento;
      const operatore = intervento.Operatore;
      const risolutivo =  intervento.Risolutivo;
      const valoreRicambi = intervento.ValoreRicambi;
      const tipo = intervento.Tipo;

      this.form = fb.group ({
        nIntervento : nIntervento,
        modello: modello,
        operatore: operatore,
        dataIntervento: dataIntervento,
        risolutivo: risolutivo,
        valoreRicambi: valoreRicambi,
        tipo: tipo

      })
    
  }

  ngOnInit(): void {
  }

  save(){
    
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
