import {
    ModuleWithProviders
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { ComposeCompanyComponent } from './compose/compose-company.component';
import { CompanyComponent } from './company.component';
import { HomeCompanyComponent } from './home/home-company.component';
import { CompanyDetailComponent } from './detail/company-detail.component';
import { PublicCompanyDetailComponent } from './detail-pub/company-detail.component';

const companyRoutes: Routes = [{
    path: '',
    component: CompanyComponent,
    children: [{
        path: '',
        component: HomeCompanyComponent
        },  {
        path: 'compose',
        component: ComposeCompanyComponent
    }, {
        path: 'compose/:id',
        component: ComposeCompanyComponent
    }, {
        path: ':id',
        component: CompanyDetailComponent
    }, {
        path: 'public/:id',
        component: PublicCompanyDetailComponent
    }]
}];

export const companyRouting: ModuleWithProviders = RouterModule.forChild(companyRoutes);
