import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DiagnosticsComponent } from './pages/diagnostics/diagnostics.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'diagnostics', component: DiagnosticsComponent },
];
