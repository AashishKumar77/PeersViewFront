/* angular components */
import {
    NgModule
} from '@angular/core';
import {
    companyRouting
} from './company-routing.component';
import { SharedModule } from '../shared/components/shared.module';
import { CompanyComponent } from './company.component';
import { ComposeCompanyComponent } from './compose/compose-company.component';
import { HomeCompanyComponent } from './home/home-company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailComponent } from './detail/company-detail.component';
import { CompanyFilterDialogComponent } from './home/filter-modal/filter-modal.component';
import { CompanyCardSuggestedComponent } from './company-card-suggested/company-card-suggested.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { PublicCompanyDetailComponent } from './detail-pub/company-detail.component';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        companyRouting
    ],
    declarations: [
        CompanyComponent,
        HomeCompanyComponent,
        ComposeCompanyComponent,
        CompanyCardComponent,
        CompanyDetailComponent,
        CompanyFilterDialogComponent,
        CompanyCardSuggestedComponent,
        PublicCompanyDetailComponent
],
    exports: [
    ],
    entryComponents: [
        CompanyFilterDialogComponent
    ],
    providers: []
})
export class CompanyModule { }
