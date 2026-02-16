import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blur-fade-effect-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './blur-fade-effect.component.html',
  styleUrl: './blur-fade-effect.component.scss',
})
export class BlurFadeEffectComponent {
  @Input() delay = 0;
}
