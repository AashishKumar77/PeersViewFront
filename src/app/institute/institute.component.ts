import {
  Component, EventEmitter,
  Input, Output,
  SimpleChanges
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
 
@Component({
  selector: 'institute-component',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent { 
  constructor ( ) {}
 

  public ngOnInit (): void {
    // this.jobSavedSubcribers();
    // console.log(this.currentUser.id)
  }
 
}
