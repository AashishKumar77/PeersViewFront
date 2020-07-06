/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  SharedModule
} from '../shared/components/shared.module';
import { JobsPubComponent } from './jobs.component';
import { jobsPubRouting } from './jobs-routing.component';
import { JobModule } from '../job/job.module';
import { JobFilterDialogComponent } from '../shared/modals';

@NgModule({
  imports : [
    SharedModule,
    jobsPubRouting
  ],
  declarations : [
    JobsPubComponent
  ],
  exports: [],
  entryComponents: [
      JobFilterDialogComponent
  ]
})
export class JobsPubModule {}
