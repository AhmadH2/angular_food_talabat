import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRestaurantFormComponent } from './add-restaurant-form/add-restaurant-form.component';
import { RestaurantItemComponent } from './restaurant-item/restaurant-item.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { AddMenuFormComponent } from './add-menu-form/add-menu-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenusListComponent } from './menus-list/menus-list.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrderedListComponent } from './ordered-list/ordered-list.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderedItemComponent } from './ordered-item/ordered-item.component';


@NgModule({
  declarations: [
    AppComponent,
    AddRestaurantFormComponent,
    RestaurantItemComponent,
    RestaurantsListComponent,
    AddMenuFormComponent,
    MenuItemComponent,
    MenusListComponent,
    EditRestaurantComponent,
    EditMenuComponent,
    PageNotFoundComponent,
    NavBarComponent,
    OrderedListComponent,
    AdminPanelComponent,
    OrderedItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
