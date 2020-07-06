/* angular components */
import {
  NgModule
} from '@angular/core';
import {
  CareerComponent
} from './career.component';
import {
  CareerIndexPageComponent
} from './index-page/index-page.component';
import {
  CareerCommunityComponent
} from './community/community.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  careerRouting
} from './career-routing.component';

@NgModule({
  imports : [
    SharedModule,
    careerRouting
  ],
  declarations : [
    CareerComponent,
    CareerIndexPageComponent,
    CareerCommunityComponent
  ],
  exports: []
})
export class CareerModule {}
