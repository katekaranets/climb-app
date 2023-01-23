import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimbSearchComponent } from './climb-search.component';

describe('ClimbSearchComponent', () => {
  let component: ClimbSearchComponent;
  let fixture: ComponentFixture<ClimbSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimbSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
