import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorModelView } from '../models/error-view.model';

@Component({
    selector:'app-error-view',
    templateUrl:'./error-view.component.html',
    styleUrls: ['./error-view.component.scss']
})

export class ErrorViewComponent implements OnInit {

    constructor(                 public    dialogRef: MatDialogRef<ErrorViewComponent>,
                                 private   router   : Router,
        @Inject(MAT_DIALOG_DATA) public    data     : ErrorModelView ){}

    ngOnInit(){
        console.log('ErrorViewComponent => ngOnInit() => ', this.data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onNoClickRoute( data:any ): void {
        this.redirectTo(this.data.route);
        this.dialogRef.close();
    }

    redirectTo(url: String) {
        this.router.navigateByUrl( '/', { skipLocationChange: true}).then( () => {
            this.router.navigate([url])
        });
    }
}