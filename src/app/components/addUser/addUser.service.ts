import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AddUserService {

    constructor(protected http:HttpClient){}

    addUser(user:User):Observable<any>{
        return this.http.post(environment.urlmodules.API + 'users',user);
    }

    updateUser( id:string, user:User ):Observable<any>{
        return this.http.put(environment.urlmodules.API + 'users/' + id, user);
    }
}