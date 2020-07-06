import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  JobsPubComponent
} from './jobs.component';

const jobsPubRoutes: Routes = [{
  path: '',
  component: JobsPubComponent
}];

export const jobsPubRouting: ModuleWithProviders = RouterModule.forChild(jobsPubRoutes);
