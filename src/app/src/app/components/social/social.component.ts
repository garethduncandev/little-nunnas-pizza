import { Component } from '@angular/core';
import { PizzaBorderComponent } from '../pizza-border/pizza-border.component';

@Component({
  selector: 'app-social',
  imports: [PizzaBorderComponent],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss',
})
export class SocialComponent {}
