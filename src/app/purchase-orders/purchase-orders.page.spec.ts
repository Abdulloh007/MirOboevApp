import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseOrdersPage } from './purchase-orders.page';

describe('PurchaseOrdersPage', () => {
  let component: PurchaseOrdersPage;
  let fixture: ComponentFixture<PurchaseOrdersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PurchaseOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
