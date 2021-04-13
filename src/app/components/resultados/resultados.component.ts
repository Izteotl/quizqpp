import { Component, OnInit } from '@angular/core';
import { QuizPreguntas } from '../../model/QuizPreguntas';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  allQuestions: QuizPreguntas[];
  correctAnswer:number =  0;
  calificacion :number; 
  constructor(private router: Router) { }

  ngOnInit() {
    const tokenID = sessionStorage.getItem('tokenID');
    if( !tokenID ){
      this.router.navigateByUrl('/login');
    }else{
      let finalizarSS    =  sessionStorage.getItem("finalizado");
    if(finalizarSS != "true"){
      this.router.navigateByUrl('/questionario');
    }
    let allQuestionsSS =  sessionStorage.getItem("allQuestions");
   // console.log(allQuestionsSS);
    this.allQuestions = JSON.parse(allQuestionsSS);
   // console.log(this.allQuestions);
    if(this.allQuestions){
      this.allQuestions.forEach(pregunta => {
        if(pregunta.answer === pregunta.selectedOption){
          this.correctAnswer++;
        }
      });
      this.calificacion = (this.correctAnswer * 100) / this.allQuestions.length;
    }
    }
    
  }

  terminar(){
    sessionStorage.removeItem('allQuestions');
    this.router.navigateByUrl('/principal');
  }

}
