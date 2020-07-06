import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CareerComponent
} from './career.component';

const careerRoutes: Routes = [{
  path: '',
  component: CareerComponent
}];

export const careerRouting: ModuleWithProviders = RouterModule.forChild(careerRoutes);
