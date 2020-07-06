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
import { JobCareerAssessmentComponent } from './career-assessment/career-assessment.component';
import { JobCareerResourcesComponent } from './career-resources/career-resources.component';
import { JobEventsComponent } from './events/events.component';
import { JobCareerEvaluationComponent } from './career-evaluation/career-evaluation.component';
import { JobCareerResourcesCourseComponent } from './career-resources/course/course.component';
import { JobResumeReviewComponent } from './resume-review/resume-review.component';
import { JobCoverLaterReviewComponent } from './cover-later-review/cover-later-review.component';
import { JobPreminumDigitalCampusComponent } from './digital-campus/digital-campus.component';
import { JobSampleResumeComponent} from './career-resources/course/finance/sample-resume/sample-resume.component';
import { EmployabililityAssessementComponent } from './employability-assessment/employabilility-assessement.component';
import { MarketOutlookComponent } from './market-outlook/market-outlook.component';
import { MockInterviewComponent } from './mock-interview/mock-interview.component';

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
        path: 'events',
        component: JobEventsComponent
    }, {
        path: 'career-resources',
        component: JobCareerResourcesComponent
    }, {
        path: 'career-resources/:id',
        component: JobCareerResourcesCourseComponent,   
    }, {  
        path: 'sample-resume',
        component: JobSampleResumeComponent
    }, {
        path: 'career-assessment',
        component: JobCareerAssessmentComponent
    }, {
        path: 'career-evaluation',
        component: JobCareerEvaluationComponent
    }, {
        path: 'digital-campus',
        component: JobPreminumDigitalCampusComponent
    }, {
        path: 'compose',
        component: ComposeJobComponent
    }, {
        path: 'resume-review',
        component: JobResumeReviewComponent
    }, {
        path: 'cover-later-review',
        component: JobCoverLaterReviewComponent
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
        path: 'compose/:id',
        component: ComposeJobComponent
    }, {
        path: ':id',
        component: JobDetailComponent
    }]
}];

export const jobRouting: ModuleWithProviders = RouterModule.forChild(jobRoutes);
