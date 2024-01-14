import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaBorderComponent } from './pizza-border.component';

describe('PizzaBorderComponent', () => {
  let component: PizzaBorderComponent;
  let fixture: ComponentFixture<PizzaBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaBorderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
