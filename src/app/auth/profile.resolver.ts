
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserService } from '../services/user.service';
import { IUser } from '../models/user.model';


interface Resolve<T> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T
}

@Injectable( { providedIn:'root' } )

export class ProfileResolver implements Resolve<IUser> {
  constructor (private userSvc: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser>|Promise<IUser>|IUser {
    return this.userSvc.getUser(route.paramMap.get('id'));
  }
} 

