/* angular components */
import {
    NgModule
} from '@angular/core';
import {
    jobRouting
} from './job-routing.component';
import { SharedModule } from '../shared/components/shared.module';
import { JobComponent } from './job.component';
import { JobsSearchComponent } from './search/search.component';
import { JobDetailComponent } from './detail/detail.component';
import { ComposeJobComponent } from './compose/compose-job.component';
import { JobHomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobsStatusComponent } from './status/status.component';
import { JobsStatusItemComponent } from './status/status-item/status-item.component';
import { JobFilterDialogComponent } from '../shared/modals';
import { JobEventsComponent } from './events/events.component';
import { JobCareerResourcesComponent } from './career-resources/career-resources.component';
import { JobCareerAssessmentComponent } from './career-assessment/career-assessment.component';
import { JobCareerEvaluationComponent } from './career-evaluation/career-evaluation.component';
import { JobCareerResourcesCourseComponent } from './career-resources/course/course.component';
import { JobResumeReviewComponent } from './resume-review/resume-review.component';
import { JobCoverLaterReviewComponent } from './cover-later-review/cover-later-review.component';
import { JobPreminumDigitalCampusComponent } from './digital-campus/digital-campus.component';
import { TabFiveComponent } from './employability-assessment/tab-5/tab-5.component';
import { TabFourComponent } from './employability-assessment/tab-4/tab-4.component';
import { TabThreeComponent } from './employability-assessment/tab-3/tab-3.component';
import { TabTwoComponent } from './employability-assessment/tab-2/tab-2.component';
import { TabOneComponent } from './employability-assessment/tab-1/tab-1.component';
import { EmployabililityAssessementComponent } from './employability-assessment/employabilility-assessement.component';
import { MarketOutlookComponent } from './market-outlook/market-outlook.component';
import { MockInterviewComponent } from './mock-interview/mock-interview.component';
import { JobSampleResumeComponent } from './career-resources/course/finance/sample-resume/sample-resume.component';
import { AlumniProfileDialogComponent } from './digital-campus/profile/profile-modal.component';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        jobRouting
    ],
    declarations: [
        JobComponent,
        JobDetailComponent,
        JobsSearchComponent,
        ComposeJobComponent,
        JobHomeComponent,
        JobsStatusComponent,
        JobsStatusItemComponent,
        JobEventsComponent,
        JobCareerResourcesComponent,
        JobCareerAssessmentComponent,
        JobResumeReviewComponent,
        JobCoverLaterReviewComponent,
        JobCareerEvaluationComponent,
        JobCareerResourcesCourseComponent,
        JobPreminumDigitalCampusComponent,
        JobSampleResumeComponent,
        MarketOutlookComponent,
        EmployabililityAssessementComponent,
        TabOneComponent,
        TabTwoComponent,
        TabThreeComponent,
        TabFourComponent,
        TabFiveComponent,
        MockInterviewComponent,
        AlumniProfileDialogComponent
    ],
    exports: [
    ],
    entryComponents: [
        JobFilterDialogComponent,
        AlumniProfileDialogComponent
    ],
    providers: []
})
export class JobProfessionalModule { }
