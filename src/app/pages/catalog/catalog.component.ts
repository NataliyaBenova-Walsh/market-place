
import { Component, OnInit, ViewChild, } from '@angular/core';
import { map } from 'rxjs/operators';
import { IItem } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  searchItemForm: FormGroup;
  items?: IItem[];
  isFilter: boolean = false;
  itemsData: any;

  constructor( public itemSvc: ItemService) {

  }
  ngOnInit(): void {
    this.retrieveItems()
    this.isFilter= false;
    this.searchItemForm = new FormGroup ({
      searchCategory: new FormControl(null, Validators.required),
    });
  
  
  }
 

  retrieveItems(): void {
    this.itemSvc.getAll().subscribe(data => {
      this.items = data;
      this.itemsData = data;
      console.log(this.items);
    });
  }

  onSearch(): void {
 
    this.isFilter = true;
    console.log('From search field: ', this.searchItemForm.value);
    const filteredItems = [];
    const searchF = this.searchItemForm.value.searchCategory;
    console.log(searchF);
        this.itemsData.forEach(item => {
          
        if(item.category==searchF) {
          filteredItems.push(item);
        }
   
      });
      console.log(filteredItems);
      this.items = filteredItems;
  
  }
  onClearFilter(): void {
    this.retrieveItems();
    
  }
 
}




  








