import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { CampusAdminApiService } from '../../../../services/api';

@Component({
   selector: 'campus-admin-registry-component',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class CampusAdminRegistryComponent implements OnInit {
  constructor (
    private campusAdminApiService: CampusAdminApiService
  ) {}

  protected dailyChartData: any = {};
  protected monthlyChartData: any = {};

  public ngOnInit (): void {
    this.campusAdminApiService.getTodayOnlineStatus()
      .then(response => {
        this.dailyChartData = response.data.day;
        this.monthlyChartData = response.data.month;
      });
  }
}
