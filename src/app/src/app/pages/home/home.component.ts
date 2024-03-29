import { Component } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';
import { ContactComponent } from '../../components/contact/contact.component';
import { AboutComponent } from '../../components/about/about.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavComponent } from '../../components/nav/nav.component';
import { SocialComponent } from '../../components/social/social.component';
import { HygieneRatingComponent } from '../../components/hygiene-rating/hygiene-rating.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InViewportModule,
    ContactComponent,
    AboutComponent,
    GalleryComponent,
    FooterComponent,
    NavComponent,
    SocialComponent,
    HygieneRatingComponent,
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
