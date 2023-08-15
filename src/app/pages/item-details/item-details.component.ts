import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from 'src/app/model/item.module';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Input() item?: IItem;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
    currentItem: IItem = {
      title: '',
      desc: '',
      price: ''
    }
    

    constructor(private itemSvc: ItemService, private route: ActivatedRoute) {}

    ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      this.itemSvc.getOne(id);
      console.log(this.currentItem);

      
    }

   

    updateItem(): void {
      const data = {
        title: this.currentItem.title,
        desc: this.currentItem.desc,
        price: this.currentItem.price

      }
      if (this.currentItem.id) {
        this.itemSvc.update(this.currentItem.id, data)
          .then(() => console.log('The item was updated successfully!'))
          .catch(err => console.log(err));
      }
    }

    deleteItem(): void {
      if(this.currentItem.id) {
        this.itemSvc.delete(this.currentItem.id)
        .then (()=> {
          this.refreshList.emit();
          console.log('Item updated!');
        })
        .catch(err => console.log(err));
      }
    }
    
}
