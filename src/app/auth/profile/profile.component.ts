import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs'
import { IItem } from 'src/app/models/item.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   currentUser?: IUser;
    currentUserItems?: IItem[];
    hasItems: boolean = true;
 
  constructor(public userSvc: UserService, public itemSvc: ItemService) {}
  ngOnInit(): void {
    
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('UserID: ',user.uid);
    const data = this.userSvc.getCurrentUser(user.uid)
    .subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
  });

  
  }


  onForSale(): void {
    this.retrieveCurrentUserItems();
    
  }

  retrieveCurrentUserItems(): void {
    
    this.itemSvc.getAll()
    
        .subscribe(data => {
      this.currentUserItems = data.filter( i => i.owner==this.currentUser.uid);
      console.log('User items', this.currentUserItems);
          this.currentUserItems.length==0 ? this.hasItems=false : this.hasItems = true;
    });
  }
    

}
  
 
