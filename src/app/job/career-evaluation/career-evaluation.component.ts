import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JobApiService } from '../../../services/api';
import { JobModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { CryptoUtilities } from '../../shared/utilities';
import { evaluationList, results } from './career-evaluation.data';

@Component({
  selector: 'job-career-evaluation-component',
  templateUrl: './career-evaluation.component.html',
  styleUrls: ['./career-evaluation.component.scss']
})
export class JobCareerEvaluationComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) {
    this.user = UserService.getUser();
  }

  public evalustionData: any = evaluationList;
  public resultData: any = results;
  protected user: UserModel = UserService.getUser();
  public evaluationResult: any = {};
  public evaluationResultArray: any = [];

  public ngOnInit (): void {}

  public calcEvaluation(): void {
    this.evaluationResultArray = [];
    this.evaluationResult = {};
    this.evalustionData.forEach(item => {
      if (item.checked) {
        if (this.evaluationResult[item.group]) {
          this.evaluationResult[item.group].push(item);
        } else {
          this.evaluationResult[item.group] = [];
          this.evaluationResult[item.group].push(item);
        }
      }
    });

    let res = [];
    let max = 0;
    Object.keys(this.evaluationResult).map(key => {
      if (this.evaluationResult[key].length > max) {
        max = this.evaluationResult[key].length;
      }
    })

    Object.keys(this.evaluationResult).map(key => {
      if (this.evaluationResult[key].length == max) {
        res.push(key);
      }
    })

    if (res.length > 2) {
      res.forEach(item => {
        this.evaluationResultArray.push({
          key: item,
          value: this.resultData[item]
        })
      });
    } else if (res.length == 2) {
      let key = `${res[0]}&${res[1]}`;
      if (!this.resultData[key]) {
        key = `${res[1]}&${res[0]}`;
      }

      if (!this.resultData[key]) {
        res.forEach(item => {
          this.evaluationResultArray.push({
            key: item,
            value: this.resultData[item]
          })
        });
      } else {
        this.evaluationResultArray.push({
          key: key,
          value: this.resultData[key]
        })
      }
      
    } else if (res.length == 1) {
      this.evaluationResultArray.push({
        key: res[0],
        value: this.resultData[res[0]]
      })
    }
  }

  public ngOnDestroy (): void {}
}
