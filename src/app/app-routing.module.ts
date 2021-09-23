import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMenuFormComponent } from './components/add-menu-form/add-menu-form.component';
import { AddRestaurantFormComponent } from './components/add-restaurant-form/add-restaurant-form.component';
import { LoginComponent } from './components/login/login.component';
import { MenusListComponent } from './components/menus-list/menus-list.component';
import { OrderedListComponent } from './components/ordered-list/ordered-list.component';
import { OrderedMenuItemsComponent } from './components/ordered-menu-items/ordered-menu-items.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { AuthGuardService as authGuard } from './services/auth-guard.service'
import { AdminAuthGuardService as adminGuard} from './services/admin-auth-guard.service'

const routes: Routes = [
  { path: "restaurants/menus/:id", component: MenusListComponent, canActivate: [authGuard]},
  { path: 'restaurants', component: RestaurantsListComponent, canActivate: [authGuard] },
  { path: 'addRest', component: AddRestaurantFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'addMenu', component: AddMenuFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'orders', component: OrderedListComponent, canActivate: [authGuard] },
  { path: 'ordersMenu/:rest_id', component: OrderedMenuItemsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent,},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
