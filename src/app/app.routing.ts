import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'pages/storage/handDevice', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/storage/handDevice' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
