import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindOutPage } from './find-out.page';

describe('FindOutPage', () => {
  let component: FindOutPage;
  let fixture: ComponentFixture<FindOutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FindOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
