import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/user.model';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs'
import { IItem } from 'src/app/model/item.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   currentUser?: IUser;
    currentUserItems?: IItem[];
  hasItems: boolean = false;
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
    this.hasItems = true;
  }
  retrieveCurrentUserItems(): void {
    
    this.itemSvc.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        ).filter(i => i.owner==this.currentUser.uid))
        ).subscribe(data => {
      this.currentUserItems = data;
      console.log('User items', this.currentUserItems);
      if(this.currentUserItems.length>0) {
        this.hasItems = true;
      }
    });
  }
    

}
  
 
