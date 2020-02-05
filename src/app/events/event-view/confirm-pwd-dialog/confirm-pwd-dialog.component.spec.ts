import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPwdDialogComponent } from './confirm-pwd-dialog.component';

describe('ConfirmPwdDialogComponent', () => {
  let component: ConfirmPwdDialogComponent;
  let fixture: ComponentFixture<ConfirmPwdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPwdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPwdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
