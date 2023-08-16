import {  HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { IItem } from 'src/app/model/item.module';
import { ItemService } from 'src/app/services/item.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  @ViewChild('searchItemForm') searchItemForm: NgForm;
  items?: IItem[];
  isFilter: boolean = false;

  constructor(private http: HttpClient, public itemSvc: ItemService) {

  }
  ngOnInit(): void {
    this.retrieveItems()
    this.isFilter= false;
    console.log(this.searchItemForm.value);
  
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
    const filteredItems = [];
    const searchF = this.searchItemForm.value.search;
    console.log(searchF);
        this.items.forEach(item => {
          const title = item.title
        if(title.includes(searchF)) {
          filteredItems.push(item);
        }
   
      });
      console.log(filteredItems);
  }
 
}




  








