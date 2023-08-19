import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { map } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemsSample?: IItem[];

  constructor(public itemSvc: ItemService) {}


  ngOnInit(): void {
    this.itemSvc.getFew().subscribe(data => {
      this.itemsSample = data.slice(0,4);
      console.log(this.itemsSample)
      
 
    });
  }


}
