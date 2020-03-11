import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    ui: firebaseui.auth.AuthUI;

    constructor(private afAuth: AngularFireAuth,
                private router:Router,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        const uiConfig = {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: this
                    .onLoginSuccessful
                    .bind(this)
            }
        };
        this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
        this.ui.start('#firebaseui-auth-container', uiConfig);
    }

    ngOnDestroy() {
        //AS: pulisce i parametri di login
        this.ui.delete();
    }

    onLoginSuccessful(result) {

        //console.log("AS-DEBUG: Firebase UI result:", result);
        
        //AS: problema refresh della pagina: con l'istruzione commentata non viene forzato il refresh della pagina
        //cosa che viene fatta invece con la seconda istruzione (vedi problema progetto iQApp)
        //this.router.navigateByUrl('/assistenza');
        this.ngZone.run(() => this.router.navigateByUrl('/assistenza'));

    }
}
