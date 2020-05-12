import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetUserComponent } from './bet-user.component';

describe('BetUserComponent', () => {
  let component: BetUserComponent;
  let fixture: ComponentFixture<BetUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
