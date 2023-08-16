import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CreateComponent } from './pages/create/create.component';
import { RegisterComponent } from "./auth/register/register.component"
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from './shared/guard/auth.guard';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  
  { path: 'catalog', component : CatalogComponent},
  {path: 'catalog/:id', component: ItemDetailsComponent},
  {path: 'catalog/:id/edit', component: EditComponent},
  {path: 'create', component: CreateComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
