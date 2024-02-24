import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnOrdersPage } from './return-orders.page';

describe('ReturnOrdersPage', () => {
  let component: ReturnOrdersPage;
  let fixture: ComponentFixture<ReturnOrdersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReturnOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
