import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mock-interview-component',
  templateUrl: './mock-interview.component.html',
  styleUrls: ['./mock-interview.component.scss']
})
export class MockInterviewComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
    ) {
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Vw1JqbvgZCc');
    }

  private safeSrc: SafeResourceUrl;

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
