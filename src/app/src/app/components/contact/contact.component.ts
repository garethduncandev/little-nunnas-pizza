import { Component } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InViewportModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  public isInViewport = false;
}
