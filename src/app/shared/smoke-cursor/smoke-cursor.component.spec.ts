import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokeCursorComponent } from './smoke-cursor.component';

describe('SmokeCursorComponent', () => {
  let component: SmokeCursorComponent;
  let fixture: ComponentFixture<SmokeCursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmokeCursorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmokeCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
