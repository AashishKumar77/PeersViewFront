import {
  Component
} from '@angular/core';
import {
  UserModel, CourseModel
} from '../../shared/models';
import {
  UserApiService, CourseApiService
} from '../../../services/api';
import {
  UtilitiesService, MessageNotificationService, NotificationTypes, CountriesService,
} from '../../../services';

@Component({
  selector: 'account-settings-general-component',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class AccountSettingsGeneralComponent {
  constructor (
    private utilitiesService: UtilitiesService,
    private courseApiService: CourseApiService,
    private userApiService: UserApiService
  ) {}

  private name: {status: string, key: string, firstName?: string, lastName?: string} = {status: 'Edit', key: 'name'};
  private email: {status: string, key: string, value?: string} = {status: 'Edit', key: 'email'};
  private languages: {status: string, key: string, value?: string} = {status: 'Edit', key: 'language'};

  private country: {status: string, key: string, value?: string} = {status: 'Edit', key: 'country'};
  private city: {status: string, key: string, value?: string} = {status: 'Edit', key: 'city'};
  private course: {status: string, key: string, value?: string, id?: number} = {status: 'Edit', key: 'course'};
  private company: {status: string, key: string, value?: string} = {status: 'Edit', key: 'company'};
  private school: {status: string, key: string, value?: string} = {status: 'Edit', key: 'school'};
  private graduate_at: {status: string, key: string, value?: Date} = {status: 'Edit', key: 'graduate_at'};
  private website: {status: string, key: string, value?: string} = {status: 'Edit', key: 'website'};
  private institution: {status: string, key: string, value?: string} = {status: 'Edit', key: 'institution'};

  private dateOfBirth: {status: string, key: string, value?: Date} = {status: 'Edit', key: 'birthDate'};
  private birthString: string = 'mm/dd/yyyy';
  private graduateString: string = 'mm/yyyy';
  private languagesData = this.utilitiesService.getlanguages();
  private userInfo: any;
  private isSentVerifyCode: boolean = false;
  private verifyPendingEmailAddress: string;
  protected countries: any[] = [];
  protected courses: CourseModel[];

  public ngOnInit (): void {
    this.countries = CountriesService.getCountries();
    this.getCourses();
    this.userApiService.promiseGetUser().then((userInfo: UserModel) => {
      console.log(userInfo);
      this.name.firstName = userInfo.firstName;
      this.name.lastName = userInfo.lastName;
      this.email.value = userInfo.email;
      this.dateOfBirth.value = userInfo.birthDate;
      this.birthString = this.utilitiesService.getBirthDate(userInfo.birthDate);
      this.graduateString = this.utilitiesService.getYearMonthFormat(userInfo.graduate_at);
      this.languages.value = userInfo.language ? userInfo.language : 'English (UK)';
      this.country.value = userInfo.country;
      this.city.value = userInfo.city;
      if (userInfo.userCourses && userInfo.userCourses[0]) {
        this.course.value = userInfo.userCourses[0].course.name;
        this.course.id = userInfo.userCourses[0].course.id;
      }
      this.company.value = userInfo.company;
      this.institution.value = userInfo.institutionName;
      this.school.value = userInfo.schoolName;
      this.website.value = userInfo.website;
      this.graduate_at.value = userInfo.graduate_at;

      this.userInfo = userInfo;
    });
  }

  private getCourses (): void {
    this.courseApiService.promiseGetAllCourses()
      .then((courses: CourseModel[]) => {
        this.courses = courses;
      })
      .catch(() => {});
  }

  protected onEditOrSave (item): void {
    if (item.status === 'Edit') {
      item.status = 'Save';
    } else {
      // request here to save the data
      console.log(item.key);
      switch (item.key) {
        case 'name':
          // this.updateUserName(item);
          break;
        case 'email':
          // this.updateUserEmail(item);
          break;
        case 'language':
          // this.updateUserLanguage(item);
          break;
      }

      item.status = 'Edit';
    }
  }

  protected onChangeLanguage (value): void {
    this.languages.value = value;
  }

  protected onChangeCourse (value): void {
    this.course.id = value;
    let selectedCourse = this.courses.find(item => item.id === Number(value));
    if (selectedCourse) {
      this.course.value = selectedCourse.name;
    }
  }

  protected onChangeCountry (value): void {
    this.country.value = value;
  }

  private sendEmailVerifyCode (email): void {
    this.verifyPendingEmailAddress = email;
    if (this.userInfo.email !== email) {
      let data = {
        email: email
      };

      this.userApiService.sendVerifyEmailCode(data).then((res: any) => {
        this.isSentVerifyCode = true;
      }).catch(error => {
        MessageNotificationService.show({
          notification: {
            id: 'send-email-verify-code-error',
            message: 'Can\'t send code to your email',
            reason: error.error,
            instruction: 'Please try again with another email address.'
          }
        },
        NotificationTypes.Error);
      });
    }
  }

  private verifyEmailAddress (code): void {
    let data = {
      email: this.verifyPendingEmailAddress,
      code: code
    };

    this.userApiService.verifyChangedPrimaryEmail(data).then((res: any) => {
      this.email.status = 'Edit';
      this.isSentVerifyCode = false;
      this.userInfo.email = this.verifyPendingEmailAddress;
    });
  }

  private checkUpdatable (): boolean {
    if (
      this.userInfo &&
      this.userInfo.firstName === this.name.firstName &&
      this.userInfo.lastName === this.name.lastName &&
      this.userInfo.language === this.languages.value &&
      this.userInfo.birthDate === this.dateOfBirth.value &&
      this.userInfo.country === this.country.value &&
      this.userInfo.city === this.city.value &&
      this.userInfo.courseId === this.course.id &&
      this.userInfo.company === this.company.value &&
      this.userInfo.institutionName === this.institution.value &&
      this.userInfo.schoolName === this.school.value &&
      this.userInfo.website === this.website.value &&
      this.userInfo.graduate_at === this.graduate_at.value) {
        return false;
    } else {
      return true;
    }
  }

  private saveGeneralInfo (): void {
    if (this.checkUpdatable()) {
      let data = {
        firstName: this.name.firstName,
        lastName: this.name.lastName,
        language: this.languages.value,
        birthDate: this.dateOfBirth.value,
        country: this.country.value,
        city: this.city.value,
        courseId: this.course.id,
        company: this.company.value,
        institution: this.institution.value,
        school: this.school.value,
        website: this.website.value,
        graduate_at: this.graduate_at.value
      };

      this.userApiService.promiseUpdateGeneralSetting(data).then((response: any) => {
        // this.name.firstName = response.data.firstName;
        // this.name.lastName = response.data.lastName;
        // this.email.value = response.data.email;
        // this.dateOfBirth.value = response.data.birthDate;
        this.birthString = this.utilitiesService.getBirthDate(this.dateOfBirth.value);
        this.graduateString = this.utilitiesService.getYearMonthFormat(this.graduate_at.value);
        console.log(this.birthString, this.graduateString);
        // this.languages.value = response.data.language ? response.data.language : 'English (UK)';
        // this.country.value = response.data.country;
        // this.city.value = response.data.city;
        // if (response.data.userCourses && response.data.userCourses[0]) {
        //   this.course.value = response.data.userCourses[0].course.name;
        //   this.course.id = response.data.userCourses[0].course.id;
        // }
        // this.company.value = response.data.company;
        // this.institution.value = response.data.institutionName;
        // this.school.value = response.data.schoolName;
        // this.website.value = response.data.website;
        // this.graduate_at.value = response.data.graduate_at;

        this.name.status = 'Edit';
        this.email.status = 'Edit';
        this.dateOfBirth.status = 'Edit';
        this.languages.status = 'Edit';
        this.country.status = 'Edit';
        this.city.status = 'Edit';
        this.course.status = 'Edit';
        this.company.status = 'Edit';
        this.institution.status = 'Edit';
        this.school.status = 'Edit';
        this.website.status = 'Edit';
        this.graduate_at.status = 'Edit';
      });
    }
  }

  private cancelEdit (): void {
    this.name.status = 'Edit';
    this.email.status = 'Edit';
    this.dateOfBirth.status = 'Edit';
    this.languages.status = 'Edit';
    this.country.status = 'Edit';
    this.city.status = 'Edit';
    this.course.status = 'Edit';
    this.company.status = 'Edit';
    this.institution.status = 'Edit';
    this.school.status = 'Edit';
    this.website.status = 'Edit';
    this.graduate_at.status = 'Edit';

    this.name.firstName = this.userInfo.firstName;
    this.name.lastName = this.userInfo.lastName;
    this.email.value = this.userInfo.email;
    this.dateOfBirth.value = this.userInfo.birthDate;
    this.birthString = this.utilitiesService.getBirthDate(this.userInfo.birthDate);
    this.graduateString = this.utilitiesService.getYearMonthFormat(this.userInfo.graduate_at);
    this.languages.value = this.userInfo.language ? this.userInfo.language : 'English (UK)';
    this.country.value = this.userInfo.country;
    this.city.value = this.userInfo.city;
    if (this.userInfo.userCourses && this.userInfo.userCourses[0]) {
      this.course.value = this.userInfo.userCourses[0].course.name;
      this.course.id = this.userInfo.userCourses[0].course.id;
    }
    this.company.value = this.userInfo.company;
    this.institution.value = this.userInfo.institutionName;
    this.school.value = this.userInfo.schoolName;
    this.website.value = this.userInfo.website;
    this.graduate_at.value = this.userInfo.graduate_at;

  }
  // private updateUserName (name): void {
  //   let nameTemp = Object.assign({}, name);
  //
  //   this.userService.updateName(name)
  //   .subscribe((response: Response) => {
  //     this.user.firstName = nameTemp.firstName;
  //     this.user.lastName = nameTemp.lastName;
  //   });
  // }
  //
  // private updateUserEmail (email): void {
  //   let emailTemp = Object.assign({}, email);
  //
  //   this.userService.updateEmail(email.value)
  //   .subscribe((response: Response) => {
  //     this.user.email = emailTemp.value;
  //   });
  // }
  //
  //
  // private updateUserLanguage (language): void {
  //   let languageTemp = Object.assign({}, language);
  //
  //   this.userService.updateLanguage(language.value)
  //   .subscribe((response: Response) => {
  //     this.user.language = languageTemp.value;
  //   });
  // }
}
