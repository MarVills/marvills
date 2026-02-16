import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipWordsComponent } from './flip-words.component';

describe('FlipWordsComponent', () => {
  let component: FlipWordsComponent;
  let fixture: ComponentFixture<FlipWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlipWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlipWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
