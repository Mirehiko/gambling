import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevgamesComponent } from './prevgames.component';

describe('PrevgamesComponent', () => {
  let component: PrevgamesComponent;
  let fixture: ComponentFixture<PrevgamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevgamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
