import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //AS: il dollaro indica che la variabile è un observable
isLoggedIn$: Observable<boolean>;
isLoggedOut$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(){
    this.afAuth.authState.subscribe(
      user=> console.log(user)
    );

    //AS: user => !!user  significa:  se user è diverso da null (utente loggato) viene restituito all'observable true, altrimenti false
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn ));
  }

  logout(){
    console.log("AS: logout");
    this.afAuth.auth.signOut();
  }

}
