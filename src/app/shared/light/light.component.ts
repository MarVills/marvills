import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './light.component.html',
  styleUrl: './light.component.scss',
})
export class LightComponent {
  @Input() left = 1;
}
