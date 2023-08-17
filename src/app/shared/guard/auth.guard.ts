
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: "root"})

export class AuthGuard {
  constructor(public userService: UserService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    console.log(this.userService.isLoggedIn);
    if (this.userService.isLoggedIn !== true) {
      this.router.navigate(['login']);
    }
    return true;
  }
  
};
