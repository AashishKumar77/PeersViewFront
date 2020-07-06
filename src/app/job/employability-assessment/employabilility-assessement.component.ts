import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'employabilility-assessement-component',
  templateUrl: './employabilility-assessement.component.html',
  styleUrls: ['./employabilility-assessement.component.scss']
})
export class EmployabililityAssessementComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  private activeTab: string = 'tab1';

  public result (activeTab): void {
    this.activeTab = activeTab;
  }

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
