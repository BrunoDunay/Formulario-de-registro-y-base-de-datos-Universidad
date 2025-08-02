import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRegistersComponent } from './all-registers.component';

describe('AllRegistersComponent', () => {
  let component: AllRegistersComponent;
  let fixture: ComponentFixture<AllRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRegistersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
