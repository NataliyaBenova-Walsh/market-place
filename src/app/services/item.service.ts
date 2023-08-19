
import { Injectable } from '@angular/core';
import { IItem } from '../models/item.model';
import {map} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


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

  getAll(): any {
    return this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
;
  }
getOne(id: any) {
    return this.itemsRef.doc(id).valueChanges();
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
