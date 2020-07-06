import {
    ModuleWithProviders
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { JobsSearchComponent } from './search/search.component';
import { JobDetailComponent } from './detail/detail.component';
import { ComposeJobComponent } from './compose/compose-job.component';
import { JobComponent } from './job.component';
import { JobHomeComponent } from './home/home.component';
import { JobsStatusComponent } from './status/status.component';
import { JobCareerEvaluationComponent } from './career-evaluation/career-evaluation.component';
import { JobCareerResourcesComponent } from './career-resources/career-resources.component';
import { JobCareerResourcesCourseComponent } from './career-resources/course/course.component';
import { MarketOutlookComponent } from './market-outlook/market-outlook.component';
import { EmployabililityAssessementComponent } from './employability-assessment/employabilility-assessement.component';
import { MockInterviewComponent } from './mock-interview/mock-interview.component';
import { JobSampleResumeComponent } from './career-resources/course/finance/sample-resume/sample-resume.component';

const jobRoutes: Routes = [{
    path: '',
    component: JobComponent,
    children: [{
        path: '',
        component: JobHomeComponent
    }, {
        path: 'search',
        component: JobsSearchComponent
    }, {
        path: 'status',
        component: JobsStatusComponent
    }, {
        path: 'compose',
        component: ComposeJobComponent
    }, {
        path: 'compose/:id',
        component: ComposeJobComponent
    }, {
        path: 'career-resources',
        component: JobCareerResourcesComponent
    }, {
        path: 'career-resources/:id',
        component: JobCareerResourcesCourseComponent,
    }, {
        path: 'career-evaluation',
        component: JobCareerEvaluationComponent
    }, {
        path: 'market-outlook',
        component: MarketOutlookComponent
    }, {
        path: 'employability-assessment',
        component: EmployabililityAssessementComponent
    }, {
        path: 'mock-interview',
        component: MockInterviewComponent
    }, {
        path: 'sample-resume',
        component: JobSampleResumeComponent
    }, {
        path: ':id',
        component: JobDetailComponent
    }]
}];

export const jobRouting: ModuleWithProviders = RouterModule.forChild(jobRoutes);
