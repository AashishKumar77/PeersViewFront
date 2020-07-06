/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  ResetPasswordComponent
} from './reset-password.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  resetPasswordRouting
} from './reset-password-routing.component';

@NgModule({
  imports : [
    SharedModule,
    resetPasswordRouting
  ],
  declarations : [
    ResetPasswordComponent
  ],
  exports: []
})
export class ResetPasswordModule {}
