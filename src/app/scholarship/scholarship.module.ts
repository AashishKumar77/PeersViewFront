/* angular components */
import {
    NgModule
} from '@angular/core';
import {
    scholarshipRouting
} from './scholarship-routing.component';
import { SharedModule } from '../shared/components/shared.module';
import { ScholarshipComponent } from './scholarship.component';
import { ScholarshipSearchComponent } from './scholarship-search/scholarship-search.component';
import { ScholarshipDetailComponent } from './scholarship-detail/scholarship-detail.component';
import { ComposeScholarshipComponent } from './compose-scholarship/compose-scholarship.component';
import { ScholarshipFilterDialogComponent } from './scholarship-search/scholarship-filter-modal/scholarship-filter-modal.component';

@NgModule({
    imports: [
        SharedModule,
        scholarshipRouting
    ],
    declarations: [
        ScholarshipComponent,
        ScholarshipDetailComponent,
        ScholarshipSearchComponent,
        ScholarshipFilterDialogComponent,
        ComposeScholarshipComponent
    ],
    exports: [
    ],
    entryComponents: [
        ScholarshipFilterDialogComponent
    ],
    providers: []
})
export class ScholarshipModule { }
