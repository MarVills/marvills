import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidCursorComponent } from './fluid-cursor.component';

describe('FluidCursorComponent', () => {
  let component: FluidCursorComponent;
  let fixture: ComponentFixture<FluidCursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluidCursorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
