import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../model/user.model';
import * as auth from 'firebase/auth';

import 'rxjs'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;
  usersRef: AngularFirestoreCollection<IUser>;

  constructor(
    private afs: AngularFirestore,
    private fireBaseAuth: AngularFireAuth,
    private router: Router,
    ) {
      this.fireBaseAuth.authState.subscribe((user)=> {
        if(user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
         JSON.parse(localStorage.getItem('user')!);
       
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });

      this.usersRef = afs.collection('/users')
    }



  signUp(email: string, password: string) {
    return this.fireBaseAuth.createUserWithEmailAndPassword(email, password);
  
  }

  login(email: string, password: string) {
   return this.fireBaseAuth.signInWithEmailAndPassword(email, password);

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(('user')!));
    return user !== null ? true : false;

  }
  


  
    logout() {
      return this.fireBaseAuth.signOut()
      .then( ()=> {
        localStorage.removeItem('user');
        console.log('User logged out');
        this.router.navigate(['/home']);
     });
  }

  getUser(id: any) {

    return this.usersRef
    .doc(id)
    .valueChanges()
   ;
  
  
  }
}
