import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRestaurantFormComponent } from './components/add-restaurant-form/add-restaurant-form.component';
import { RestaurantItemComponent } from './components/restaurant-item/restaurant-item.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { AddMenuFormComponent } from './components/add-menu-form/add-menu-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenusListComponent } from './components/menus-list/menus-list.component';
import { EditRestaurantComponent } from './components/edit-restaurant/edit-restaurant.component';
import { EditMenuComponent } from './components/edit-menu/edit-menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OrderedListComponent } from './components/ordered-list/ordered-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderedItemComponent } from './components/ordered-item/ordered-item.component';
import { LoginComponent } from './components/login/login.component';
import { OrderedMenuItemsComponent } from './components/ordered-menu-items/ordered-menu-items.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './home/home.component';


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
    NavBarComponent,
    OrderedListComponent,
    OrderedItemComponent,
    LoginComponent,
    OrderedMenuItemsComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
