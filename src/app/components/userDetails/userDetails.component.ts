import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from './userDetails.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';


export interface UserElement {
  uid      :string;
  userName :string;
  password :string;
  rol      :string;
  status   :boolean; 
}



@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.scss']
})
export class UserDetailsComponent implements OnInit {
  rol:string;
  displayedColumns: string[] = ['uid','userName','password','rol','status','delete','edit'];
  dataSource: UserElement[];
  isDisabled: boolean = true;
  

  

  constructor(private   router: Router,
              protected userDetailsService: UserDetailsService ) { }

  ngOnInit() {
    const tokenID = sessionStorage.getItem('tokenID');
    if( !tokenID ){
      this.router.navigateByUrl('/login');
    }else{
      const rolS    = sessionStorage.getItem('rol');
      if( rolS ) {
        this.rol = rolS;
      }
      this.userDetailsService.getAllUsers().subscribe( res => {
        console.log('ngOnInit() => getAllUsers() => SUCCESS ');
        console.log( res );
        this.dataSource = res.users;
      }, err => {
        console.log('ngOnInit() => getAllUsers() => FAIL ');
        console.log( err );
        if(err.status == 401){
          sessionStorage.clear();
          this.router.navigateByUrl('/login');
        }
      });
    }
    
  }

  deleteUser(row:UserElement){
    console.log(row);

  }

  editUser(row:UserElement){
    console.log(row);
    this.router.navigate(['/addUser'],{state : { userData: row }});
  }

  addUser(){
    this.router.navigateByUrl('/addUser');
  }

  return(){
    this.router.navigateByUrl('/principal');
  }

  isAdmin(){
    console.log(this.rol);
    if(this.rol === 'ROOT_ROLE' || this.rol === 'ADMIN_ROLE'){
      this.isDisabled = null;
      return true;
    }else{
      this.isDisabled = true;
      return false;
    }
  }

  isVisible(data:any){
    console.log(data);
    return true;
  }

}
