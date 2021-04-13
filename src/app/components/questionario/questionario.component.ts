import { Component, OnInit } from '@angular/core';
import { QuizPreguntas } from '../../model/QuizPreguntas';
import { Router } from '@angular/router';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {ThemePalette} from '@angular/material/core';
import { QuestionarioService } from './questionario.service';



@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  preguntaActual: QuizPreguntas;
  questionID = 0;
  disabled:   boolean = true;
  siguienteB: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  allQuestions: QuizPreguntas[];

 

  constructor(private router: Router,
              protected questionarioService: QuestionarioService) { 
    
  }

  ngOnInit() {
    const tokenID = sessionStorage.getItem('tokenID');
    if( !tokenID ){
      this.router.navigateByUrl('/login');
    }else{
      let questionIDSS = sessionStorage.getItem("questionID");
      let allQuestionsSS =  sessionStorage.getItem("allQuestions");
      if(questionIDSS === null){
        this.router.navigateByUrl('/principal');
      }
      this.questionID = parseInt(questionIDSS);
      if(allQuestionsSS != null){
        this.allQuestions = JSON.parse(allQuestionsSS);
        this.setQuestionID(this.questionID);
        this.preguntaActual = this.getPreguntaActual;
        if(this.questionID == this.allQuestions.length){
          this.siguienteB = false;
        }
      }else{
        //CARGAMOS CUESTIONARIO.
        this.questionarioService.getQuizQuestion().subscribe(res => {
         // console.log('ngOnInit() => getQuizQuestion() => SUCCESS');
         // console.log( res.respuesta );
          this.allQuestions = res.respuesta;
          this.setQuestionID(this.questionID);
          this.preguntaActual = this.getPreguntaActual;
          if(this.questionID == this.allQuestions.length){
            this.siguienteB = false;
          }
        }, err => {
          console.log('ngOnInit() => getQuizQuestion() => FAIL');
          console.log( err );
          if(err.status == 401){
            this.router.navigateByUrl('/login');
          }
        });
      }
    }
  }

  setQuestionID(id: number) {
    return this.questionID = id;
  }

  get getPreguntaActual(): QuizPreguntas {
    return this.allQuestions.filter(
      question => question.questionId === this.questionID
    )[0];
  }

  radioChange(answer: string) {
    //console.log(answer);
    this.disabled = false;
    this.preguntaActual.selectedOption = answer;
  }

  siguiente(){
    //console.log(this.questionID);
    if(this.questionID == this.allQuestions.length -1 ){
      this.siguienteB = false;
      this.setQuestionID(this.questionID + 1);
      this.preguntaActual = this.getPreguntaActual;
      this.disabled = true;
    }else{
      this.disabled = true;
      this.setQuestionID(this.questionID + 1);
      this.preguntaActual = this.getPreguntaActual;
    }
    sessionStorage.setItem("questionID",this.questionID.toString());
    sessionStorage.setItem("allQuestions",JSON.stringify(this.allQuestions));
  }

  finalizar(){
   // console.log(this.allQuestions);
    sessionStorage.setItem("allQuestions",JSON.stringify(this.allQuestions));
    sessionStorage.setItem("questionID","1");
    sessionStorage.setItem("finalizado","true");
    this.router.navigateByUrl('/resultados');

  }

}
