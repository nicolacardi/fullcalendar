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
pictureUrl$: Observable<string>;
UserName$: Observable<string>;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(){
    this.afAuth.authState.subscribe(
      user=> console.log(user)
    );

    //AS: user => !!user  significa:  se user è diverso da null (utente loggato) viene restituito all'observable true, altrimenti false
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    //console.log ("loggedin",this.isLoggedIn$);
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn ));
    this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ?  user.photoURL: null));
    this.UserName$ = this.afAuth.authState.pipe(map(user => user ?  user.displayName: null));
    
  }

  logout(){
    console.log("AS: logout");
    this.afAuth.auth.signOut();
    //this.router.navigate(['PublicPage']);
  }

}
