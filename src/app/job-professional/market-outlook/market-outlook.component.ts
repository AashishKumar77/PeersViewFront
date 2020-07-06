import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'market-outlook-component',
  templateUrl: './market-outlook.component.html',
  styleUrls: ['./market-outlook.component.scss']
})
export class MarketOutlookComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
