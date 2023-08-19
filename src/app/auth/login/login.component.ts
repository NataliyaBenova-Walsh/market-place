import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../../models/user.model';
import 'rxjs'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: any;
  reactiveForm: FormGroup;
  fbError: boolean = false;

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
    this.fbError = false;

  }

  onLogin() {
    
  
    this.userSvc.login(this.reactiveForm.value.email, this.reactiveForm.value.password)
    .then ((res)=> {
      //this.SetUserData(res.user);
      this.fireBaseAuth.authState.subscribe((user)=> {
        if(user) {
         
          this.router.navigate(['/catalog']);
        }
      });
    
     }, err => {
      this.fbError = true;
      console.log(err.message);
      this.reactiveForm.reset();
      
     });

  
   
  }

  
}
