import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorModelView } from '../../shared/models/error-view.model';
import { ErrorDialogService } from './error-dialog.service';

@Injectable({
    providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

    dataError: ErrorModelView

    constructor( protected errorDialog: ErrorDialogService  ) {}

    intercept( req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        const isToken = sessionStorage.getItem("tokenID");
        if( isToken ){
            req = req.clone({
                setHeaders:{
                   'x-token-cace': isToken
                }
            });
        }
       
        //console.log("Interceptor => ", req.url );
        //console.log(req);
        const requestLogin = req;
        return next.handle( requestLogin ).pipe(
            catchError( ( err:HttpErrorResponse ) => {
                this.dataError = new ErrorModelView();
                switch(err.status){
                    case 400:
                        this.dataError.message = 'Favor de revisar que los datos sean validos';
                        this.errorDialog.openDialogError(this.dataError);
                        break;
                    case 401:
                        this.dataError.message = 'Usuario no Autorizado';
                        this.errorDialog.openDialogError(this.dataError);
                        break;
                    case 404:
                        this.dataError.message = 'Datos no encontrados';
                        this.errorDialog.openDialogError(this.dataError);
                        break;
                    default:
                        this.dataError.message = 'Ocurrio un erro favor de notificar a su administrator';
                        this.errorDialog.openDialogError(this.dataError);
                }
                return throwError(err);
            } )
        );
    }

}