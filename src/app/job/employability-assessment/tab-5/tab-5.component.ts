import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tab-5-component',
  templateUrl: './tab-5.component.html',
  styleUrls: ['./tab-5.component.scss']
})
export class TabFiveComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
