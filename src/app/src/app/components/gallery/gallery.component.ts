import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';
import { PizzaBorderComponent } from '../pizza-border/pizza-border.component';

@Component({
  selector: 'app-gallery',
  imports: [InViewportModule, CommonModule, PizzaBorderComponent, NgOptimizedImage],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  public isInViewport = signal<string[]>([]);

  public images = signal<{ url: string; rotate: number }[]>([]);

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
