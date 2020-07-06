import { VerifyConnectionComponent } from './verify-connection/verify-connection.component';
import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  UserComponent
} from './user.component';
import {
  UserVerifyEmailComponent
} from './verify-email/verify-email.component';
import {
  UserOnboardingComponent
} from './on-boarding/on-boarding.component';
import {
  UserOnboardingSelectStatusComponent
} from './on-boarding/select-status/select-status.component';
import {
  UserOnboardingStudentComponent
} from './on-boarding/student/student.component';
import {
  UserOnboardingStudentInterestComponent
} from './on-boarding/student/interest/interest.component';
import {
  UserOnboardingProfessionalComponent
} from './on-boarding/professional/professional.component';
import {
  UserOnboardingOrganisationComponent
} from './on-boarding/organisation/organisation.component';
import {
  CheckIfUserIsAlreadyVerifiedComponent
} from './verify-email/check-if-user-is-already-verified.component';
import { AuthGuard } from '../shared/can-activate';

const userRoutes: Routes = [{
  path: '',
  component: UserComponent
}, {
  path: 'verify-email/:jotToken/:token',
  component: UserVerifyEmailComponent,
  canActivate: [CheckIfUserIsAlreadyVerifiedComponent],
}, {
  path: 'verify-connection/:token',
  component: VerifyConnectionComponent
}, {
  path: 'on-boarding',
  component: UserOnboardingComponent,
  children: [{
    path: 'status',
    component: UserOnboardingSelectStatusComponent,
    data: {
      step: ['active', 'next', 'next'],
      state: 'on-boarding-status'
    }
  }, {
    path: 'status/organisation',
    component: UserOnboardingOrganisationComponent,
    data: {
      step: ['complete', 'active', 'next'],
      state: 'on-boarding-status-organisation'
    }
  }, {
    path: 'status/organisation/interest',
    component: UserOnboardingStudentInterestComponent,
    data: {
      step: ['complete', 'complete', 'active'],
      state: 'on-boarding-status-organisation-interest'
    }
  }, {
    path: 'status/professional',
    component: UserOnboardingProfessionalComponent,
    data: {
      step: ['complete', 'active', 'next'],
      state: 'on-boarding-status-professional'
    }
  }, {
    path: 'status/student',
    component: UserOnboardingStudentComponent,
    data: {
      step: ['complete', 'active', 'next'],
      state: 'on-boarding-status-student'
    }
  }, {
    path: 'status/student/interest',
    component: UserOnboardingStudentInterestComponent,
    data: {
      step: ['complete', 'complete', 'active'],
      state: 'on-boarding-status-student-interest'
    },
  }],
  canActivate: [AuthGuard]
}];

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);
