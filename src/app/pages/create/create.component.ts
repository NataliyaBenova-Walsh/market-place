import {  HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IItem } from 'src/app/model/item.module';
import { ItemService } from 'src/app/services/item.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  item: IItem = new IItem();
  submited = false;
  createForm : FormGroup;

constructor(private itemSvc: ItemService) {}

ngOnInit(): void {
  this.createForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    desc: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required]),
    //imgUrl: new FormControl(null),
    //id: new FormControl(null),
  });
}

  onItemCreate() : void {
    const body: any = {
      title: this.createForm.value.title,
      desc: this.createForm.value.desc,
      price: this.createForm.value.price
   

    }
    console.log(body);

    this.itemSvc.create(body).
    then(()=> {
      console.log('New item created successfully!');
      console.log(this.item);
      this.submited = true;
      this.createForm.reset();
    });

   
    //this.itemSvc.createItem(items)
    //.subscribe((res)=> {
    //  console.log(res, 'Item has been added');
   // })

  }
  newItem(): void {
    this.submited = false;
    this.item = new IItem();
  }

}


 

