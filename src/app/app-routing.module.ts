import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusListComponent } from './menus-list/menus-list.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';

const routes: Routes = [
  { path: "menus/:rest_id", component:MenusListComponent},
  {path: '', component: RestaurantsListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
