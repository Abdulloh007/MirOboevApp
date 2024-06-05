import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabbbarPage } from './tabbbar.page';

describe('TabbbarPage', () => {
  let component: TabbbarPage;
  let fixture: ComponentFixture<TabbbarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabbbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
