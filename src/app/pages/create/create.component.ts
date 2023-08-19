
import { Component, OnInit } from '@angular/core';

import { IItem } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  item: IItem = new IItem();
  submited = false;
  createForm : FormGroup;

constructor(private itemSvc: ItemService, private router: Router) {}

ngOnInit(): void {
  
  this.createForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    desc: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required]),
    imgUrl: new FormControl(null),
    category: new FormControl(null, Validators.required)
  });

}

  onItemCreate() : void {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user['uid']);
    
    const body: any = {
      title: this.createForm.value.title,
      price: this.createForm.value.price,
      imgUrl: this.createForm.value.imgUrl,
      desc: this.createForm.value.desc,
      category: this.createForm.value.category,
      owner: user['uid'],
      ownerEmail: user['email']

    }
    console.log(body);

    this.itemSvc.create(body).
    then(()=> {
      console.log('New item created successfully!');
     
      this.submited = true;

      this.router.navigate(['/catalog']);
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

  shouldShowError(controlName: string) {
    return this.createForm.controls[controlName].touched && this.createForm.controls[controlName].invalid
  }

}


 

