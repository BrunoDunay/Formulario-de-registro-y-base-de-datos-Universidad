import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaSelectComponent } from './programa-select.component';

describe('ProgramaSelectComponent', () => {
  let component: ProgramaSelectComponent;
  let fixture: ComponentFixture<ProgramaSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramaSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
