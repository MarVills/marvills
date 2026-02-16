import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashCursorComponent } from './splash-cursor.component';

describe('SplashCursorComponent', () => {
  let component: SplashCursorComponent;
  let fixture: ComponentFixture<SplashCursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplashCursorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
