import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SequrityPage } from './sequrity.page';

describe('SequrityPage', () => {
  let component: SequrityPage;
  let fixture: ComponentFixture<SequrityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SequrityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
