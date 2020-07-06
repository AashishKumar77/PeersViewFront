import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ForgotPasswordComponent
} from './forgot-password.component';

const forgotPasswordRoutes: Routes = [{
  path: '',
  component: ForgotPasswordComponent
}];

export const forgotPasswordRouting: ModuleWithProviders = RouterModule.forChild(forgotPasswordRoutes);
