import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-pizza-border',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-border.component.html',
  styleUrl: './pizza-border.component.scss',
})
export class PizzaBorderComponent implements OnInit {
  @Input() public imageUrl!: string;
  @Input() public rotation!: number;

  public rotateStyle = signal<string | undefined>(undefined);

  public ngOnInit(): void {
    const style = `transform: rotate(${this.rotation}deg);`;
    this.rotateStyle.set(style);
  }
}
