import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRestaurantFormComponent } from './add-restaurant-form/add-restaurant-form.component';
import { RestaurantItemComponent } from './restaurant-item/restaurant-item.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRestaurantFormComponent,
    RestaurantItemComponent,
    RestaurantsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
