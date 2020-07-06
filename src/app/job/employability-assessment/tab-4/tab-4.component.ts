import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tab-4-component',
  templateUrl: './tab-4.component.html',
  styleUrls: ['./tab-4.component.scss']
})
export class TabFourComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
