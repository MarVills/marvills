import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurFadeEffectComponent } from './blur-fade-effect.component';

describe('BlurFadeEffectComponent', () => {
  let component: BlurFadeEffectComponent;
  let fixture: ComponentFixture<BlurFadeEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlurFadeEffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlurFadeEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
