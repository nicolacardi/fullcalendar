import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { InterventoTipo } from '../models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterventiService } from '../shared/interventi.service';

@Component({
  selector: 'app-intervento-dialog',
  templateUrl: './intervento-dialog.component.html',
  styleUrls: ['./intervento-dialog.component.css']
})
export class InterventoDialogComponent implements OnInit {
  form: FormGroup;

  tipiArray = ['Meccanico', 'Elettrico', 'Idraulico', 'Carrozzeria'];
  operators = ['Nicola Cardi', 'Andrea Svegliado', 'Giulio Costacurta', 'Matteo Cardi'];
  intervento: InterventoTipo;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<InterventoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) intervento: InterventoTipo,
      private interventiService: InterventiService) {
      
      this.intervento = intervento; //assegno anche alla variabile intervento quello che sto passando alla dialog
        //console.log (this.intervento);
      this.form = fb.group ({
        NIntervento : {value: intervento.NIntervento, disabled: true} ,
        Modello: intervento.Modello,
        Operatore: intervento.Operatore,
        //DataIntervento: intervento.DataIntervento,
        dtIntervento: intervento.dtIntervento,
        Risolutivo: intervento.Risolutivo,
        ValoreRicambi: intervento.ValoreRicambi,
        Tipo: intervento.Tipo
      })
    
  }



  ngOnInit(): void {

  }

  save(){
    const changes = this.form.value;
    //console.log(changes)
    this.interventiService.saveIntervento(this.intervento.id, changes)
      .subscribe(
        () => this.dialogRef.close(this.form.value)
      );
  }

  close() {
    this.dialogRef.close();
  }

}
