import { Component } from '@angular/core';
import { FacebookProfileUrl, InstagramProfileUrl } from '../../consts';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss',
})
export class SocialComponent {
  public facebookProfileUrl = FacebookProfileUrl;
  public instagramProfileUrl = InstagramProfileUrl;
}
