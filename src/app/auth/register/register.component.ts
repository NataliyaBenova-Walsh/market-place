import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import 'rxjs'
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { passwordMatch } from '../auth.module';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData: any;
  regForm: FormGroup;
  fbError: boolean = false;
  passwordControl = new FormControl(null, [Validators.required]);

  constructor(private userSvc: UserService, private router: Router,  private afs: AngularFirestore,
    private fireBaseAuth: AngularFireAuth
    ) {
    this.fireBaseAuth.authState.subscribe((user)=> {
      if(user) {
        this.userData = user;
        console.log(this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
       JSON.parse(localStorage.getItem('user')!);
     
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: this.passwordControl,
      rePassword: new FormControl(null, [passwordMatch(this.passwordControl)])
    });
    this.fbError = false;
  }

  onRegister() {
    
    console.log(this.regForm);
    const body: any = {
      firstName: this.regForm.value.firstName,
      lastName: this.regForm.value.lastName,
      email: this.regForm.value.email,
      password: this.regForm.value.password,

    }
  
    this.userSvc.signUp(body.email, body.password)   
   .then((res)=> {
    
    this.SetUserData(res.user);
    this.fireBaseAuth.authState.subscribe((user) => {
      if(user) {
       
        this.router.navigate(['/catalog']);
       
        this.regForm.reset();
      }
    });
   }, err => {
    console.log(err.message);
    this.fbError = true;
  } );
 
   
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(userRef);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      firstName: this.regForm.value.firstName,
      lastName: this.regForm.value.lastName,
    
    };
    console.log(userData);
    return userRef.set(userData, {
      merge: true,
    });
  }

  shouldShowError(controlName: string) {
    return this.regForm.controls[controlName].touched && this.regForm.controls[controlName].invalid
  }

}
