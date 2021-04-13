import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginInvalid:boolean = false;


  constructor(
    private   fb            : FormBuilder,
    private   router        : Router,
    protected loginService  : LoginService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username : ['',Validators.email],
      password : ['',Validators.required]
    });
  }

  onSubmit(){
    if( this.form.invalid ){

    }else{
      const dataUser =  {
        userName: this.form.value.username,
        password: this.form.value.password
      };
      console.log(dataUser);
      this.loginService.postLogin(dataUser).subscribe( res => {
        console.log('onSubmit() => postLogin() => SUCCESS ');
        console.log( res );
        sessionStorage.setItem("tokenID",res.token);
        sessionStorage.setItem("rol",res.user.rol);
        this.router.navigateByUrl('/principal');
      }, err => {
        console.log('onSubmit() => postLogin() => FAIL ');
        console.log( err );
      });
    }
  }
}
