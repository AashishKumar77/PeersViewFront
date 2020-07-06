import { Component, ViewChild } from '@angular/core';
import {
  CompanyApiService,
  IndustryApiService,
  UserApiService,
} from '../../../services/api';
import { CompanyModel, IndustryModel, AttachmentModel } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoUtilities } from '../../shared/utilities';
import { CountriesService } from '../../../services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompanyFactory } from '../../shared/models/factory';
import { CompanyEmitter } from '../../shared/emitter';
import { UserModel } from '../../shared/models';

@Component({
  selector: 'compose-company-component',
  templateUrl: './compose-company.component.html',
  styleUrls: ['./compose-company.component.scss'],
})
export class ComposeCompanyComponent {
  constructor (
    private companyApiService: CompanyApiService,
    private industryApiService: IndustryApiService,
    private userApiService: UserApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    if (route.snapshot.params.id) {
      this.isEdit = true;
      this.companyId = parseFloat(
        CryptoUtilities.decipher(route.snapshot.params.id)
      );
      this.getCompany(this.companyId);
    }
    this.getIndustries();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  private companyComposeForm: FormGroup;
  private form: CompanyModel = new CompanyModel();
  protected company: CompanyModel;
  private isEdit: boolean = false;
  protected countries: any[] = [];
  protected industries: IndustryModel[] = [];
  protected imageSelected: boolean = false;
  protected imageReSelected: boolean = false;
  protected isSubmitted: boolean = false;
  protected companys: CompanyModel[] = [];
  protected userInfo: any = undefined;
  protected logo: AttachmentModel;
  protected images: AttachmentModel[] = [];
  protected attachments: AttachmentModel[] = [];
  protected companyId: number;

  public ngOnInit (): void {
    this.userApiService.promiseGetUser().then((userInfo: UserModel) => {
      this.userInfo = userInfo;
    });
    this.countries = CountriesService.getCountries();
    this.companyComposeForm = this.fb.group({
      company: ['', Validators.required],
      company_type: [''],
      company_size: [''],
      company_contact: [''],
      country: ['', Validators.required],
      city: ['', Validators.required],
      recruit: [''],
      industry: [''],
      company_bio: ['', Validators.required],
      logo: ['']
    });

  }

  get f (): any {
    return this.companyComposeForm.controls;
  }

  private getIndustries (): void {
    this.industryApiService
      .promiseGetAllIndustries()
      .then((industries: IndustryModel[]) => {
        this.industries = industries;
      });
  }

  private getCompany (id: number): void {
    this.companyApiService
      .promiseGetCompany(id)
      .then((company: CompanyModel) => {
        this.form = company;
        this.attachments = this.form.companyAttachments;
        for ( let attach of this.attachments) {
          if ( attach.usage === 'logo') {
               this.logo = attach;
          } else if ( attach.usage === 'image') {
            this.images.push(attach);
          }
        }

        this.companyComposeForm = this.fb.group({
          company: this.form.company,
          company_type: this.form.company_type,
          company_size: this.form.company_size,
          company_contact: this.form.company_contact,
          country: this.form.country,
          city: this.form.city,
          recruit: this.form.recruit,
          industry: this.form.industry,
          company_bio: this.form.company_bio,
          attachments: this.form.companyAttachments,
          logo: this.form.logo
        });
      });
    this.imageSelected = true;
  }

  protected onImageSelected (selected): void {
    this.imageSelected = selected;
  }

  protected onUploadComplete (attachments): void {
    this.createCompany(attachments);
  }

  private markFormGroupTouched (form: FormGroup): void {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  protected onDeleteItem ( item: AttachmentModel): void {

  this.companyApiService
        .promiseDeleteCompanyAttachment(item.id)
        .then((res) => {
          this.getCompany(this.companyId);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  protected onChangeCompany (item): void {
    const companyId = CryptoUtilities.cipher(item);
    this.router.navigate([`/companies/compose`, companyId]);
  }

  protected onSave (): void {
    this.markFormGroupTouched(this.companyComposeForm);
    this.isSubmitted = true;
    if (this.companyComposeForm.valid && this.imageSelected) {
        return CompanyEmitter.uploadImages().emit();
    }
  }

  protected createCompany (attachments): void {
    let data = CompanyFactory.createCompany(this.companyComposeForm.value);
    if (data.recruit) {
      data.recruit = 1;
    } else {
      data.recruit = 0;
    }
      for ( let attach of attachments) {
        if ( attach.usage === 'logo') {
             data.logo = attach.cloudinaryPublicId;
        }
    }
    data.userId = this.userInfo.id;

    data.companyAttachments = attachments;

    if (this.isEdit) {
      this.companyApiService
        .promiseUpdateCompany(data, this.form.id)
        .then((res) => {
          this.router.navigate([`/account-settings/company-profile`], {
            relativeTo: this.route,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.companyApiService
        .promisePostCompany(data)
        .then((res) => {
          this.router.navigate([`/account-settings/company-profile`], {
            relativeTo: this.route,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
