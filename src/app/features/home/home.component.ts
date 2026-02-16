import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { BlurFadeEffectComponent } from '../../shared/blur-fade-effect/blur-fade-effect.component';
import { LightComponent } from '../../shared/light/light.component';
import { FlipWordsComponent } from '../../shared/flip-words/flip-words.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  animations: [
    trigger('profileAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5) rotate(120deg)' }),
        animate(
          '1s ease-out',
          style({ opacity: 1, transform: 'scale(1) rotate(0)' }),
        ),
      ]),
    ]),

    trigger('textAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),

    trigger('waveAnim', [
      transition(':enter', [
        animate(
          '1s ease-in-out 1s infinite',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: 0 }),
            style({ transform: 'rotate(20deg)', offset: 0.2 }),
            style({ transform: 'rotate(-10deg)', offset: 0.4 }),
            style({ transform: 'rotate(10deg)', offset: 0.6 }),
            style({ transform: 'rotate(-5deg)', offset: 0.8 }),
            style({ transform: 'rotate(0deg)', offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
  imports: [BlurFadeEffectComponent, LightComponent, FlipWordsComponent],
})
export class HomeComponent {
  words = [
    'Frontend Developer',
    'Full Stack Developer',
    'Laravel Developer',
    'Enthusiastic Learner',
  ];

  getCurrentAge(): number {
    const birthDate = new Date(2001, 0, 1); // CHANGE THIS
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
