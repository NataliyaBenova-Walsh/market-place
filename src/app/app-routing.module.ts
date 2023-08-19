import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CreateComponent } from './pages/create/create.component';
import { RegisterComponent } from "./auth/register/register.component"
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from './shared/guard/auth.guard';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  
  { path: 'catalog', component : CatalogComponent},
  {path: 'catalog/:id', component: ItemDetailsComponent, canActivate:[AuthGuard]},
 {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'create', component: CreateComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
