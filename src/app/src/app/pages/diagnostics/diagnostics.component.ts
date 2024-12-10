import { Component, OnInit, signal } from '@angular/core';
import { DiagnosticsClient } from '../../web-api-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagnostics',
  imports: [CommonModule],
  templateUrl: './diagnostics.component.html',
  styleUrl: './diagnostics.component.scss',
})
export class DiagnosticsComponent implements OnInit {
  public diagnostics = signal<Date | undefined>(undefined);

  public constructor(private diagnosticsClient: DiagnosticsClient) {}

  public ngOnInit(): void {
    this.diagnosticsClient.getDiagnostics().subscribe((response) => {
      this.diagnostics.set(response);
      console.log('Diagnostics page', response);
    });
  }
}
