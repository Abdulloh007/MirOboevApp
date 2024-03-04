import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotationPage } from './rotation.page';

describe('RotationPage', () => {
  let component: RotationPage;
  let fixture: ComponentFixture<RotationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RotationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
