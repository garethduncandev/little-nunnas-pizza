import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, signal } from '@angular/core';
import { HygieneRating } from './hygiene-rating';

@Component({
    selector: 'app-hygiene-rating',
    imports: [],
    templateUrl: './hygiene-rating.component.html',
    styleUrl: './hygiene-rating.component.scss'
})
export class HygieneRatingComponent implements OnInit {
  @Input() public businessId!: string;
  public rating = signal<number | undefined>(5);

  public constructor(private httpClient: HttpClient) {}

  public ngOnInit(): void {
    this.fetchFoodHygieneRating();
  }

  public fetchFoodHygieneRating(): void {
    this.httpClient
      .get<HygieneRating>(
        `https://ratings.food.gov.uk/api/download-data/json/establishments/${this.businessId}`
      )
      .subscribe((response) => {
        this.rating.set(response.EstablishmentCollection.EstablishmentDetail.scores.Hygiene);
      });
  }
}
