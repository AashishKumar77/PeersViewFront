import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CanActivateUserProfile,
  RedirectToOnboardingComponent,
  RedirectToHomeComponent,
  RedirectToIndexComponent,
  AuthGuard
} from './shared/can-activate';
import {InstituteComponent} from './institute/institute.component';
export const appRoutes: Routes = [{
  path: 'peers',
  loadChildren: './peers/peers.module#PeersModule',
  data: {state: 'peers'}
},
{path:'institute', component:InstituteComponent,
resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
},
{
  path: 'campus',
  loadChildren: './campus/campus.module#CampusModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'campus'}
}, {
  path: 'community',
  loadChildren: './community/community.module#CommunityModule',
  resolve: [RedirectToOnboardingComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'community'}
}, {
  path: 'user',
  loadChildren: './user/user.module#UserModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'user'}
}, {
  path: 'profile',
  loadChildren: './profile/profile.module#ProfileModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'profile'}
}, {
  path: 'companies',
  loadChildren: './company/company.module#CompanyModule',
  data: {state: 'company'}
}, {
  path: 'home',
  loadChildren: './home/home.module#HomeModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {
    state: 'home'
  }
}, {
  path: 'leisure',
  loadChildren: './leisure/leisure.module#LeisureModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'leisure'}
}, {
  path: 'review-resume',
  loadChildren: './review-resume/review-resume.module#ReviewResumeModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'review-resume'}
}, {
  path: '',
  loadChildren: './index/index.module#IndexModule',
  resolve: [RedirectToOnboardingComponent, RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    title: 'The Social Network for Students'
  }
}, {
  path: 'sign-up',
  loadChildren: './sign-up/sign-up.module#SignUpModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'sign-up',
    title: 'Sign up',
  }
}, {
  path: 'sign-in',
  loadChildren: './sign-in/sign-in.module#SignInModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'sign-in',
    title: 'Sign in',
  }
}, {
  path: 'forgot-password',
  loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'forgot-password',
    title: 'Forgot Password',
  }
}, {
  path: 'reset-password',
  loadChildren: './reset-password/reset-password.module#ResetPasswordModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'reset-password',
    title: 'Reset Password',
  }
}, {
  path: 'about-us',
  loadChildren: './about-us/about-us.module#AboutUsModule',
  data: {
    state: 'about-us',
    title: 'About Peersview',
  }
}, {
  path: 'employers',
  loadChildren: './employers/employers.module#EmployersModule',
  data: {
    state: 'employers',
    title: 'Employers',
  }
}, {
  path: 'career',
  loadChildren: './career/career.module#CareerModule',
  data: {
    state: 'career',
    title: 'Career Services',
  }
}, {
  path: 'contact-us',
  loadChildren: './contact-us/contact-us.module#ContactUsModule',
  data: {
    state: 'contact-us',
    title: 'Contact Us',
  }
},
{
  path: 'jobs',
  loadChildren: './jobs-pub/jobs.module#JobsPubModule',
  data: {
    state: 'jobs-pub',
    title: 'Internships/Jobs'
  }
},
{
  path: 'support',
  loadChildren: './help-center/help-center.module#HelpCenterModule',
  data: {
    state: 'help-center',
    title: 'Help Center'
  }
}, {
  path: 'digital-campus',
  loadChildren: './digital-campus/digital-campus.module#DigitalCampusModule',
  data: {
    state: 'digital-campus',
    title: 'Peersview Digital Campus',
  }
}, {
  path: 'scholarship',
  loadChildren: './scholarship/scholarship.module#ScholarshipModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {
    state: 'scholarship',
    title: 'Peersview Scholarship',
  }
}, {
  path: 'job',
  loadChildren: './job/job.module#JobModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {
    state: 'Career Center',
    title: 'Peersview Jobs',
  }
}, {
  path: 'job-professional',
  loadChildren: './job-professional/job.module#JobProfessionalModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {
    state: 'premium-career-center',
    title: 'Premium Career Center',
  }
}, {
  path: 'blog',
  loadChildren: './blog/blog.module#BlogModule',
  data: {
    state: 'blog',
    title: 'Peersview Blog',
  }
}, {
  path: 'advance-search',
  loadChildren: './advance-search/advance-search.module#AdvanceSearchModule',
  data: {state: 'advance-search'}
}, {
  path: 'account-settings',
  loadChildren: './account-settings/account-settings.module#AccountSettingsModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'account-settings'}
}, {
  path: 'terms-of-use-user',
  loadChildren: './terms-of-use-user/terms-of-use-user.module#TermsOfUseUserModule',
  data: {
    state: 'terms-of-use-user',
    title: 'Service Terms | Peersview Digital Campus',
  }
}, {
  path: 'privacy-policy',
  loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule',
  data: {
    state: 'privacy-policy',
    title: 'Privacy policy',

  }
}, {
  path: 'notification',
  loadChildren: './notification/notification.module#NotificationModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'notification'}
}, {
  path: 'campus-admin',
  loadChildren: './campus-admin/campus-admin.module#CampusAdminModule',
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'campus-admin'}
}, {
  path: 'terms-of-use',
  loadChildren: './terms-of-use/terms-of-use.module#TermsOfUseModule',
  data: {
    state: 'terms-of-use',
    title: 'Terms of Use',
  }
}, {
  path: 'messages',
  loadChildren: './messages/messages.module#MessagesModule',
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {state: 'messages'}
}, {
  path: 'create-ad',
  loadChildren: './create-ad/create-ad.module#CreateAdModule',
  canActivate: [AuthGuard, CanActivateUserProfile],
  data: {
    state: 'create-ad',
    title: 'Create Ad'
  }
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
