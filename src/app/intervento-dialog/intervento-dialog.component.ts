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
      console.log("ecco il formato che passa alla dialog")  
      console.log (this.intervento);
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

    // this.form.setValue({dtIntervento: '2000-01-01'});
    const changes = this.form.value;

    let anno = new Date(this.form.value.dtIntervento).getFullYear();
    let month = new Date(this.form.value.dtIntervento).getMonth() + 1 ;
    let day = new Date(this.form.value.dtIntervento).getDate();
    let Strmonth = month.toString();
    let Strday = day.toString();
    if(Strmonth.length < 2)  { Strmonth = "0" + Strmonth};
    if(Strday.length < 2)  { Strday = "0" + Strday};
    changes.dtIntervento = anno+'-'+Strmonth+'-'+Strday; //.toString();
    console.log(changes);

    this.interventiService.saveIntervento(this.intervento.id, changes)
      .subscribe(
        () => this.dialogRef.close(this.form.value)
      );
  }

  close() {
    this.dialogRef.close();
  }

}
