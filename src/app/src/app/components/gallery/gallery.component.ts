import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [InViewportModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  public isInViewport = signal<string[]>([]);

  public addElementInViewport(id: string, visible: boolean): void {
    // if already added to isInViewport
    if (visible && this.isInViewport().some((item) => item === id)) {
      return;
    }

    // if not, then add
    if (visible && !this.isInViewport().some((item) => item === id)) {
      const n = this.isInViewport();
      n.push(id);
      this.isInViewport.set(n);
      return;
    }

    // else remove
    this.isInViewport.set(this.isInViewport().filter((item) => item !== id));
  }
}
