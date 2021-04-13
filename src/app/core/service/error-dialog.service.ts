import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ErrorModelView } from '../../shared/models/error-view.model';
import { ErrorViewComponent } from '../../shared/error-view/error-view.component';




@Injectable({
    providedIn:'root'
})
export class ErrorDialogService{

    constructor( public dialog: MatDialog){}

    openDialogError( dataError: ErrorModelView ): void {
        const dialogRef = this.dialog.open( ErrorViewComponent, {
            panelClass:'blocking-error', 
            data: dataError,
            hasBackdrop: false
        });
        dialogRef.afterClosed().subscribe( result => {
            console.log('El dialog fue cerrado');
        });
    }
}