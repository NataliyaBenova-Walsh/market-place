import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from '../model/item.module';
import { Observable} from 'rxjs'
import { map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  currentItem: IItem;
  private dbPath = '/items';

  itemsRef: AngularFirestoreCollection<IItem>;

  constructor(private afs: AngularFirestore) {
    this.itemsRef = afs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IItem> {
    
    return this.itemsRef;
  }
getOne(id: any) {

  return this.itemsRef
  .doc(id)
  .valueChanges()
 ;


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
