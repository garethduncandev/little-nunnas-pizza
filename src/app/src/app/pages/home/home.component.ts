import { Component } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';
import { AboutComponent } from '../../components/about/about.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { SocialComponent } from '../../components/social/social.component';

@Component({
  selector: 'app-home',
  imports: [
    InViewportModule,
    ContactComponent,
    AboutComponent,
    GalleryComponent,
    FooterComponent,
    SocialComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public image1IsInViewport = false;
  public image2IsInViewport = false;
  public image3IsInViewport = false;
  public text1IsInViewport = false;
  public form1IsInViewport = false;

  public scroll(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  public onIntersection({ visible }: { target: Element; visible: boolean }, image: string): void {
    if (image === '1') {
      this.image1IsInViewport = visible;
    }

    if (image === '2') {
      this.image2IsInViewport = visible;
    }

    if (image === '3') {
      this.image3IsInViewport = visible;
    }

    if (image === 'text') {
      this.text1IsInViewport = visible;
    }

    if (image === 'form') {
      this.form1IsInViewport = visible;
    }
  }
}
