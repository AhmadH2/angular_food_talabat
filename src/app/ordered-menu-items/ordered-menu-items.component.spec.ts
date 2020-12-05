import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedMenuItemsComponent } from './ordered-menu-items.component';

describe('OrderedMenuItemsComponent', () => {
  let component: OrderedMenuItemsComponent;
  let fixture: ComponentFixture<OrderedMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedMenuItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
