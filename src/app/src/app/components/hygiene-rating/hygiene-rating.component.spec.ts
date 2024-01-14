import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HygieneRatingComponent } from './hygiene-rating.component';

describe('HygieneRatingComponent', () => {
  let component: HygieneRatingComponent;
  let fixture: ComponentFixture<HygieneRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HygieneRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HygieneRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
