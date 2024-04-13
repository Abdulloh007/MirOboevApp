import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InquirerPage } from './inquirer.page';

describe('InquirerPage', () => {
  let component: InquirerPage;
  let fixture: ComponentFixture<InquirerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InquirerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
