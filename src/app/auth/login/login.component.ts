import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../../model/user.model';
import 'rxjs'
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: any;
  reactiveForm: FormGroup;

  constructor(public userSvc: UserService, private router: Router,  private afs: AngularFirestore,
    private fireBaseAuth: AngularFireAuth,) {
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
    }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
     
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

  }

  onLogin() {
    
  
    this.userSvc.login(this.reactiveForm.value.email, this.reactiveForm.value.password)
    .then ((res)=> {
      this.SetUserData(res.user);
      this.fireBaseAuth.authState.subscribe((user)=> {
        if(user) {
         
      
          this.router.navigate(['/catalog']);
        }
      });
    
     }, err => {
      alert(err.message);
    
     });

  
   
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(userRef);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    
    };
    console.log(userData);
    return userRef.set(userData, {
      merge: true,
    });
  }
}
