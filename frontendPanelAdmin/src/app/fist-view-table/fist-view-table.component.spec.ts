import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FistViewTableComponent } from './fist-view-table.component';

describe('FistViewTableComponent', () => {
  let component: FistViewTableComponent;
  let fixture: ComponentFixture<FistViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FistViewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FistViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
