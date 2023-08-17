import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   currentUser?: IUser;
  

  constructor(private userSvc: UserService) {
    
  }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('UserID: ',user.uid);
    const data = this.userSvc.getCurrentUser(user.uid)
    .subscribe(user => {
      
      this.currentUser = user;
      console.log(this.currentUser);
     
  });
    }
 
 
   
    
  }
  
 
