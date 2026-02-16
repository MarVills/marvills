import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flip-words',
  standalone: true,
  imports: [],
  templateUrl: './flip-words.component.html',
  styleUrl: './flip-words.component.scss',
})
export class FlipWordsComponent {
  @Input() words: string[] = [];
}
