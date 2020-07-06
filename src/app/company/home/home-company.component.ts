import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyApiService } from '../../../services/api';
import { CompanyModel } from '../../shared/models';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { CompanyFilterDialogComponent } from './filter-modal/filter-modal.component';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'home-company-component',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.scss'],
})
export class HomeCompanyComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private companyApiService: CompanyApiService
  ) {
    this.filters.companyName = this.route.snapshot.paramMap.get('companyName');
    this.filters.country = this.route.snapshot.paramMap.get('country');
    this.filters.city = this.route.snapshot.paramMap.get('city');
    this.filters.industries = this.route.snapshot.paramMap.get('industries')
      ? this.route.snapshot.paramMap.get('industries').split(',')
      : [];
    this.filters.hiringCompanies = this.route.snapshot.paramMap.get(
      'hiringCompanies'
    );

    this.getCompanys();
  }
  protected companys: CompanyModel[] = [];
  protected totalCount: number = 0;
  protected oriCompanys: CompanyModel[] = [];
  protected companyName: string = '';
  protected region: string = '';
  protected isMarketingFilter = false;
  protected isManagementFilter = false;
  protected isSecurityFilter = false;
  protected isAnalystFilter = false;
  protected isITFilter = false;
  protected isMiningFilter = false;
  protected isOilGasFilter = false;
  protected isTaxFilter = false;
  private limit = 15;
  private offset = 0;
  protected isLoadingMore: boolean = false;
  protected filters: any = {};

  @HostListener('window:scroll', [])
  protected onScroll (): void {
    // let divElemHeight = document.getElementById('shared-post-component').offsetHeight;
    let homeElement = document.getElementById('home-company-component');

    if (homeElement) {
      let elemBountRect = homeElement.getBoundingClientRect();

      if (window.innerHeight + window.scrollY >= elemBountRect.height - 100) {
        // you're at the bottom of the page
        if (this.companys.length < this.totalCount && !this.isLoadingMore) {
          this.onLoadMore();
        }
      }
    }
  }

  protected onLoadMore (): void {
    this.isLoadingMore = true;
    this.offset = this.companys.length;

    this.companyApiService
      .promiseGetAllCompanys(
        this.limit,
        this.offset,
        this.filters.companyName,
        this.filters.country
      )
      .then((data) => {
        this.companys = this.companys.concat(data.companys);
        this.totalCount = data.total;
        this.isLoadingMore = false;
      });
  }

  private getCompanys (): void {
    this.companyApiService
      .promiseGetAllCompanys(
        30,
        0,
        this.filters.companyName,
        this.filters.country
      )
      .then((data) => {
        let compare = function (a, b): number {
          if (a.isSelfCountry < b.isSelfCountry) {
            return 1;
          }
          if (a.isSelfCountry > b.isSelfCountry) {
            return -1;
          }
          return 0;
        };

        data.companys.sort(compare);
        this.companys = data.companys;
        this.oriCompanys = data.companys;
        this.totalCount = data.total;
      });
  }

  public searchCompany (): void {
    this.router.navigate(['/companies'], {
      queryParams: {
        country: this.filters.country,
        city: this.filters.city,
        companyName: this.filters.companyName,
        industries: this.filters.industries,
        hiringCompanies: this.filters.hiringCompanies ? 'true' : null,
      },
    });

    this.getCompanys();
  }

  public onKey (event: any): void {
    // without type info
    this.filters.companyName = event.target.value;
  }

  public onSearchCompany (): void {
    this.searchCompany();
  }

  public openFilterModal (): void {
    let that = this;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'company-filter-modal';
    dialogConfig.id = 'CompanyFilterModalDialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      filters: [
        this.isMarketingFilter,
        this.isManagementFilter,
        this.isSecurityFilter,
        this.isAnalystFilter,
        this.isITFilter,
        this.isMiningFilter,
        this.isOilGasFilter,
        this.isTaxFilter,
      ],
    };
    this.dialog
      .open(CompanyFilterDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.filters = data;
          this.searchCompany();
        }
      });
  }
}
