/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  ForgotPasswordComponent
} from './forgot-password.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  forgotPasswordRouting
} from './forgot-password-routing.component';

@NgModule({
  imports : [
    SharedModule,
    forgotPasswordRouting
  ],
  declarations : [
    ForgotPasswordComponent
  ],
  exports: []
})
export class ForgotPasswordModule {}
