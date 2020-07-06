import {
    ModuleWithProviders
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { BlogHomeComponent } from './home/home.component';
import { BlogDetailComponent } from './detail/detail.component';
import { CreateBlogComponent } from './create/create.component';
import { BlogComponent } from './blog.component';
import { RedirectToOnboardingComponent, RedirectToIndexComponent, AuthGuard, CanActivateUserProfile } from '../shared/can-activate';

const blogRoutes: Routes = [{
    path: '',
    component: BlogComponent,
    children: [{
        path: '',
        component: BlogHomeComponent
    }, {
        path: 'create',
        component: CreateBlogComponent,
        resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
        canActivate: [AuthGuard, CanActivateUserProfile],
    }, {
        path: 'edit/:id',
        component: CreateBlogComponent,
        resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
        canActivate: [AuthGuard, CanActivateUserProfile],
    }, {
        path: ':id',
        component: BlogDetailComponent
    }]
}];

export const blogRouting: ModuleWithProviders = RouterModule.forChild(blogRoutes);
