import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-pizza-border',
  standalone: true,
  imports: [],
  templateUrl: './pizza-border.component.html',
  styleUrl: './pizza-border.component.scss',
})
export class PizzaBorderComponent {
  @Input() public imageUrl!: string;
  public classes = signal<string | undefined>(undefined);

  private initialClasses = 'absolute inset-0 h-full w-full';

  public constructor() {
    const degreeValue = this.randomDegree();
    this.classes.set(`${this.initialClasses} rotate-[${degreeValue}deg]`);
  }

  public randomDegree(): number {
    return Math.floor(Math.random() * 360);
  }
}
