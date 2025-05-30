import { Component, signal } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';

@Component({
  selector: 'app-about',
  imports: [InViewportModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  public isInViewport = signal(false);
}
