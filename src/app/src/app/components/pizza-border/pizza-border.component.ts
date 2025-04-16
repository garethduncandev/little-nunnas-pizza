import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, input } from '@angular/core';

@Component({
  selector: 'app-pizza-border',
  imports: [CommonModule],
  templateUrl: './pizza-border.component.html',
  styleUrl: './pizza-border.component.scss',
})
export class PizzaBorderComponent implements OnInit {
  public readonly imageUrl = input.required<string>();
  public readonly rotation = input.required<number>();

  public rotateStyle = signal<string | undefined>(undefined);

  public ngOnInit(): void {
    const style = `transform: rotate(${this.rotation()}deg);`;
    this.rotateStyle.set(style);
  }
}
