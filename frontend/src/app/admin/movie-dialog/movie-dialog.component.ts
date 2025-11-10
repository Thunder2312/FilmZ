import { Component } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
@Component({
  selector: 'app-movie-dialog',
  imports: [],
  templateUrl: './movie-dialog.component.html',
  styleUrl: './movie-dialog.component.scss'
})
export class MovieDialogComponent {
    openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    
  }
}
