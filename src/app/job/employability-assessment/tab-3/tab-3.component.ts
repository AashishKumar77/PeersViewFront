import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tab-3-component',
  templateUrl: './tab-3.component.html',
  styleUrls: ['./tab-3.component.scss']
})
export class TabThreeComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
