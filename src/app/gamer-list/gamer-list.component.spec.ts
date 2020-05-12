import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamerListComponent } from './gamer-list.component';

describe('GamerListComponent', () => {
  let component: GamerListComponent;
  let fixture: ComponentFixture<GamerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
