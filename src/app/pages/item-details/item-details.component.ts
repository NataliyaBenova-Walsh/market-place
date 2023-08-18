import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IItem } from 'src/app/model/item.module';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Input() currentItem: IItem;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  @ViewChild('editItemForm') editItemForm: NgForm;
    
   isOwner: boolean = false;
   inEditMode: boolean = false;
   isOwnerEmail: boolean = false;

    constructor(private itemSvc: ItemService, 
      private userSvc: UserService, private route: ActivatedRoute, private router: Router, library: FaIconLibrary) {
        library.addIcons(faArrowLeft);
      }
     
     

    ngOnInit(): void {

      this.route.params.subscribe((params: Params) => {
        const id = params['id'];
        console.log('Item id', id);

      const data = this.itemSvc.getOne(id)
      .subscribe(item => {
        const itemDetails = {...item, id: id};
        this.currentItem = itemDetails;
        console.log(this.currentItem);
        if(user['uid']==this.currentItem.owner) {
          this.isOwner=true;
        }
    });
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('UserID: ',user.uid);

      })
    }

   onEdit(): void {
    this.inEditMode = true;

    setTimeout(()=> {
      this.editItemForm.setValue ({
        title: this.currentItem.title,
        imgUrl: this.currentItem.imgUrl,
        price: this.currentItem.price,
        category: this.currentItem.category,
        desc: this.currentItem.desc,
      });
    })
   }

   onCancel(): void {
    this.inEditMode = false;
   }

   onBuy(): void {
    this.isOwnerEmail = true;

   }

    onUpdateItem(): void {
      const data = {
        title: this.editItemForm.value.title,
        desc: this.editItemForm.value.desc,
        price: this.editItemForm.value.price,
        imgUrl: this.editItemForm.value.imgUrl
      }
      if (this.currentItem.id) {
        this.itemSvc.update(this.currentItem.id, data)
          .then(() => {
           console.log('The item was updated successfully!');
           this.inEditMode = false;
          })
          .catch(err => console.log(err));
      }
    }

    onDeleteItem(): void {
      if(this.currentItem.id) {
        this.itemSvc.delete(this.currentItem.id)
        .then (()=> {
          this.refreshList.emit();
          console.log('Item deleted!');
          this.router.navigate(['/catalog']);
        })
        .catch(err => console.log(err));
      }
    }
    
}
