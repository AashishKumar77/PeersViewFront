import {
  Component, ViewChild
} from '@angular/core';
import { JobApiService, IndustryApiService } from '../../../services/api';
import { JobModel, IndustryModel } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoUtilities } from '../../shared/utilities';
import { CountriesService } from '../../../services';
import { PostEmitter } from '../../shared/emitter';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobFactory } from '../../shared/models/factory';

@Component({
  selector: 'compose-job-component',
  templateUrl: './compose-job.component.html',
  styleUrls: ['./compose-job.component.scss']
})
export class ComposeJobComponent {
  skillArray = [];
  showSkill:boolean=false;
  constructor (
    private jobApiService: JobApiService,
    private industryApiService: IndustryApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    if (route.snapshot.params.id) {
      this.isEdit = true;
      const jobId = parseFloat(CryptoUtilities.decipher(route.snapshot.params.id));
      this.getJob(jobId);
    }
    this.getIndustries();
  }

  private jobComposeForm: FormGroup;
  private form: JobModel = new JobModel;
  protected job: JobModel;
  private isEdit: boolean = false;
  protected countries: any[] = [];
  protected industries: IndustryModel[] = [];
  protected imageSelected: boolean = false;
  protected isSubmitted: boolean = false;

  public ngOnInit (): void {
    this.countries = CountriesService.getCountries();
    this.jobComposeForm = this.fb.group({
      title: ['', Validators.required],
      company:  ['', Validators.required],
      company_logo:  [''],
      company_bio:  ['', Validators.required],
      industryId:  ['', Validators.required],
      country:  ['', Validators.required],
      province: [''],
      city:  ['', Validators.required],
      contact:  ['', Validators.required],
      type:  ['', Validators.required],
      // experience:  ['', Validators.required],
      jobfunction:  ['', Validators.required],
      deadline:  ['', Validators.required],
      source_link:  ['', Validators.required],
      price:  ['', Validators.required],
      currency:  ['$', Validators.required]
    });
  }

  get f (): any { return this.jobComposeForm.controls; }

  private getIndustries (): void {
    this.industryApiService.promiseGetAllIndustries()
      .then((industries: IndustryModel[]) => {
        // console.log(industries);
        this.industries = industries;
      });
  }
  skillcheck(index,event){
    console.log('skill list',event.target.checked)
    if(event.target.checked==true){
this.skillArray.push(event.target.value)
    } else if(event.target.checked==false){
      this.skillArray.splice(index,1)
    }
    console.log('skill array',this.skillArray)
  }
  private getJob (id: number): void {
    this.jobApiService.promiseGetJob(id)
      .then((job: JobModel) => {
        
        this.jobComposeForm = this.fb.group({
          title: [job.title, Validators.required],
          company:  [job.company, Validators.required],
          company_logo:  [job.company_logo],
          company_bio:  [job.company_bio, Validators.required],
          industryId:  [job.industryId, Validators.required],
          country:  [job.country, Validators.required],
          province: [job.province],
          city:  [job.city, Validators.required],
          contact:  [job.contact, Validators.required],
          type:  [job.type, Validators.required],
          // experience:  ['', Validators.required],
          jobfunction:  [job.jobfunction, Validators.required],
          deadline:  [job.deadline, Validators.required],
          source_link:  [job.source_link, Validators.required],
          price:  [job.price, Validators.required],
          currency:  [job.currency, Validators.required]
        });
      });
  }

  protected onImageSelected (selected): void {
    this.imageSelected = selected;
  }

  protected onUploadComplete (attachments): void {
    console.log(attachments);
    let logoUrl = attachments[0].cloudinaryPublicId;
    // this.form.company_logo = attachments;
    this.createJob(logoUrl);
  }

  private markFormGroupTouched (form: FormGroup): void {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  protected onSave (): void {
    this.markFormGroupTouched(this.jobComposeForm);
    this.isSubmitted = true;
    if (this.jobComposeForm.valid && this.imageSelected) {
      return PostEmitter.uploadImages().emit();
    }
  }

  protected createJob (logoUrl: string): void {
    let formData = this.jobComposeForm.value;
    let selectedIndustry = this.industries.find(item => item.id === Number(formData.industryId));
    formData.industry = selectedIndustry.name;
    let data = JobFactory.createJob(formData);
    data.company_logo = logoUrl;

    if (this.isEdit) {
      this.jobApiService.promiseUpdateJob(data, this.form.id)
        .then((res) => {
          console.log(res);
          this.router.navigate([`/job/search`], {relativeTo: this.route});
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.jobApiService.promisePostJob(data)
        .then((res) => {
          console.log(res);
          this.router.navigate([`/job/search`], {relativeTo: this.route});
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
