import {  HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { IItem } from 'src/app/model/item.module';
import { ItemService } from 'src/app/services/item.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  searchItemForm: FormGroup;
  items?: IItem[];
  isFilter: boolean = false;

  constructor(private http: HttpClient, public itemSvc: ItemService) {

  }
  ngOnInit(): void {
    this.retrieveItems()
    this.isFilter= false;
    this.searchItemForm = new FormGroup ({
      searchCategory: new FormControl(null, Validators.required),
    });
  
  
  }
 

  retrieveItems(): void {
    this.itemSvc.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  onSearch(): void {
    this.isFilter = true;
    console.log('From search field: ', this.searchItemForm.value);
    const filteredItems = [];
    const searchF = this.searchItemForm.value.searchCategory;
    console.log(searchF);
        this.items.forEach(item => {
          
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




  








