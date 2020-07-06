import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumni-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class AlumniProfileDialogComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    public data: any,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  public ngOnInit (): void {
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
  }
}
