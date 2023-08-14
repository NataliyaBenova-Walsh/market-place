import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from '../model/item.module';
import { Observable} from 'rxjs'
import { map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private dbPath = '/items';

  itemsRef: AngularFirestoreCollection<IItem>;

  constructor(private db: AngularFirestore) {
    this.itemsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IItem> {
    console.log(this.itemsRef);
    return this.itemsRef;
  }

  
  create(item: IItem): any {
    return this.itemsRef.add({ ...item });
  }

  update(id: string, data: any): Promise<void> {
    return this.itemsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.itemsRef.doc(id).delete();
  }
 


  
}
