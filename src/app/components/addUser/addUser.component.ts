import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddUserService } from './addUser.service';
import { User } from '../../model/User';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss']
})
export class AddUserComponent implements OnInit {
  rol:string;
  isEdit    = false;
  id : string;
  isChecked = true;
  addForm: FormGroup;
  user: User = {
    userName : '',
    password : '',
    rol      : '',
    status   : false
  };
  isProcessing: boolean = false;
  constructor(
    private   router        : Router,
    private   fb            : FormBuilder,
    protected addUserService: AddUserService,
    public    dialog        : MatDialog) { }

  ngOnInit() {
    const tokenID = sessionStorage.getItem('tokenID');
    
    if( !tokenID ){
      sessionStorage.clear();      
      this.router.navigateByUrl('/login');
    }else{
      const rolS    = sessionStorage.getItem('rol');
      if( rolS ) {
        this.rol = rolS;
      }
      const dataEdit =  history.state.userData;
      if( dataEdit ){
        this.isChecked = dataEdit.status;
        this.isEdit = true;
        this.id = dataEdit.uid;
        this.addForm = this.fb.group({
          username:[dataEdit.userName ,[Validators.required,Validators.email]],
          password:[dataEdit.password,[Validators.required,Validators.minLength(6)]],
          rol:[dataEdit.rol,Validators.required],
          status:[dataEdit.status,Validators.required]
        });
      }else{
        this.addForm = this.fb.group({
          username:['',[Validators.required,Validators.email]],
          password:['',[Validators.required,Validators.minLength(6)]],
          rol:['ALUMNO_ROLE',Validators.required],
          status:[this.isChecked,Validators.required]
        });
      }
    }
  }

  onSubmit(){
    if(this.addForm.invalid){

    }else{
      this.isProcessing = true;
      this.user.userName = this.addForm.value.username;
      this.user.password = this.addForm.value.password;
      this.user.rol      = this.addForm.value.rol;
      this.user.status   = this.addForm.value.status;
      if(this.isEdit){
        this.updateUser();
      }else{
        this.addUser();
      }
            
    }
  }

  updateUser(){
    this.addUserService.updateUser( this.id, this.user ).subscribe ( res => {
      console.log('onSubmit() => updateUser() => SUCCESS');
      console.log(res);
      this.router.navigateByUrl('/userDetails');
    }, err => {
      this.isProcessing = false;
      console.log('onSubmit() => updateUser() => FAIL');
      console.log(err);
      if(err.status == 401){
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
      }
    });
  }

  addUser(){
    this.addUserService.addUser( this.user ).subscribe( res => {
      console.log('onSubmit() => addUser() => SUCCESS');
      console.log(res);
      this.router.navigateByUrl('/userDetails');
    }, err => {
      this.isProcessing = false;
      console.log('onSubmit() => addUser() => FAIL');
      console.log(err);
      console.log(err.error);
      if(err.status == 401){
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
      }
    });   
  }

  cancelar(){
    this.router.navigateByUrl('/userDetails');
  }

  getErrorMessage() {
    if (this.addForm.controls.username.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    return this.addForm.controls.username.hasError('email') ? 'Email no valido' : '';
  }

  isAdmin(){
    if(this.rol === 'ROOT_ROLE' || this.rol === 'ADMIN_ROLE'){
      return true;
    }else{
      return false;
    }
  }
}
