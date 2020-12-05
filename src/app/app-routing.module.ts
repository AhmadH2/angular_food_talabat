import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMenuFormComponent } from './add-menu-form/add-menu-form.component';
import { AddRestaurantFormComponent } from './add-restaurant-form/add-restaurant-form.component';
import { LoginComponent } from './login/login.component';
import { MenusListComponent } from './menus-list/menus-list.component';
import { OrderedListComponent } from './ordered-list/ordered-list.component';
import { OrderedMenuItemsComponent } from './ordered-menu-items/ordered-menu-items.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';

const routes: Routes = [
  { path: "menus/:rest_id", component:MenusListComponent},
  { path: 'restaurants', component: RestaurantsListComponent },
  { path: 'addRest', component: AddRestaurantFormComponent },
  { path: 'addMenu', component: AddMenuFormComponent },
  { path: 'orders', component: OrderedListComponent },
  { path: 'ordersMenu/:rest_id', component: OrderedMenuItemsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: RestaurantsListComponent },
  { path: '**', component: RestaurantsListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
