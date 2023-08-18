import { ItemService } from 'src/app/services/item.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { IUser } from '../model/user.model';


interface Resolve<T> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T
}

@Injectable( { providedIn:'root' } )

export class UserResolver implements Resolve<IUser> {
  constructor (private userSvc: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser>|Promise<IUser>|IUser {
    return this.userSvc.getUser(route.paramMap.get('id'));
  }
} 

