import {
    ModuleWithProviders
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { ScholarshipSearchComponent } from './scholarship-search/scholarship-search.component';
import { ScholarshipDetailComponent } from './scholarship-detail/scholarship-detail.component';
import { ComposeScholarshipComponent } from './compose-scholarship/compose-scholarship.component';
import { ScholarshipComponent } from './scholarship.component';

const scholarshipRoutes: Routes = [{
    path: '',
    component: ScholarshipComponent,
    children: [{
        path: '',
        component: ScholarshipSearchComponent
    }, {
        path: 'compose',
        component: ComposeScholarshipComponent
    }, {
        path: 'compose/:id',
        component: ComposeScholarshipComponent
    }, {
        path: ':id',
        component: ScholarshipDetailComponent
    }]
}];

export const scholarshipRouting: ModuleWithProviders = RouterModule.forChild(scholarshipRoutes);
