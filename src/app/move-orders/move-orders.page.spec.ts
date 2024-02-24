import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoveOrdersPage } from './move-orders.page';

describe('MoveOrdersPage', () => {
  let component: MoveOrdersPage;
  let fixture: ComponentFixture<MoveOrdersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoveOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
