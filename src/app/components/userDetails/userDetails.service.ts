import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserDetailsService {

    constructor(protected http:HttpClient){}

    getAllUsers():Observable<any>{
        return this.http.get(environment.urlmodules.API + 'users' );
    }
}