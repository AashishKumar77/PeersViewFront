import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ResetPasswordComponent
} from './reset-password.component';

const resetPasswordRoutes: Routes = [{
  path: '',
  component: ResetPasswordComponent
}];

export const resetPasswordRouting: ModuleWithProviders = RouterModule.forChild(resetPasswordRoutes);
