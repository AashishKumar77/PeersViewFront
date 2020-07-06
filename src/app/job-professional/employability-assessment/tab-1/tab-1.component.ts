import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tab-1-component',
  templateUrl: './tab-1.component.html',
  styleUrls: ['./tab-1.component.scss']
})
export class TabOneComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
