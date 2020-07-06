import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ReviewResumeComponent
} from './review-resume.component';

const reviewResumeRoutes: Routes = [{
  path: '',
  component: ReviewResumeComponent
}];

export const reviewResumeRouting: ModuleWithProviders = RouterModule.forChild(reviewResumeRoutes);
