import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tab-2-component',
  templateUrl: './tab-2.component.html',
  styleUrls: ['./tab-2.component.scss']
})
export class TabTwoComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
