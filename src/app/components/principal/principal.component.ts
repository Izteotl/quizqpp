import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  rol:string;
  btnEmpezar: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const tokenID = sessionStorage.getItem('tokenID');
    const rolS    = sessionStorage.getItem('rol');
    if( !tokenID ){
      this.router.navigateByUrl('/login');
    }
    if( rolS ) {
      this.rol = rolS;
    }
  }

  empesarQuestionario(){
    this.btnEmpezar = true; 
    sessionStorage.setItem("questionID","1");
    this.router.navigateByUrl('/questionario');
  }

  altaUsuario(){
    this.router.navigateByUrl('/userDetails');
  }

  salir(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  isAdmin(){
    if(this.rol === 'ROOT_ROLE' || this.rol === 'ADMIN_ROLE'){
      return true;
    }else{
      return false;
    }
  }


}
