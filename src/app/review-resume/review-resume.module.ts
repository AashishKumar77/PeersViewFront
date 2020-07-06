/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  ReviewResumeComponent
} from './review-resume.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  reviewResumeRouting
} from './review-resume-routing.component';

@NgModule({
  imports : [
    SharedModule,
    reviewResumeRouting
  ],
  declarations : [
    ReviewResumeComponent
  ],
  exports: [],
  providers: []
})
export class ReviewResumeModule {}
