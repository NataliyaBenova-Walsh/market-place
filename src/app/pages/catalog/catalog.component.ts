import {  HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IItem } from 'src/app/model/item.module';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  items?: IItem[];

  constructor(private http: HttpClient, private itemSvc: ItemService) {

  }
  ngOnInit(): void {
    this.retrieveItems()
    
    //this.itemSvc.get()
    //.subscribe(items => {
     // this.items = items;
     // console.log('from newService', this.items);
   // });
  }
  onItemsGet() {
  
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
      console.log(data);
    });
  }
  
 
}




  








