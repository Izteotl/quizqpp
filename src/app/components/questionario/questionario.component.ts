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
  //allQuestions: QuizPreguntas[];

  allQuestions: QuizPreguntas[] = [
    {
      questionId:1,
      questionText: '¿Cuál es el sinonimo de DELEGACION?',
      options:[
        { optionValue: '1', optionText: 'Retención' },
        { optionValue: '2', optionText: 'Cuidado' },
        { optionValue: '3', optionText: 'Acusación' },
        { optionValue: '4', optionText: 'Discreción' },
        { optionValue: '5', optionText: '$c = \\pm\\sqrt\\{a^2 + b^2\\}$' }
      ],
      answer: '1',
      explanation: 'a service gets passed to the client during DI',
      selectedOption: ''
    },
    {
      questionId: 2,
      questionText: 'Which of the following benefit from dependency injection?',
      options: [
        { optionValue: '1', optionText: 'Programming' },
        { optionValue: '2', optionText: 'Testability' },
        { optionValue: '3', optionText: 'Software design' },
        { optionValue: '4', optionText: 'All of the above.' },
      ],
      answer: '4',
      explanation: 'DI simplifies both programming and testing as well as being a popular design pattern',
      selectedOption: ''
    },
    {
      questionId: 3,
      questionText: 'Which of the following is the first step in setting up dependency injection?',
      options: [
        { optionValue: '1', optionText: 'Require in the component.' },
        { optionValue: '2', optionText: 'Provide in the module.' },
        { optionValue: '3', optionText: 'Mark dependency as @Injectable().' },
        { optionValue: '4', optionText: 'Declare an object.' }
      ],
      answer: '3',
      explanation: 'the first step is marking the class as @Injectable()',
      selectedOption: ''
    },
    {
      questionId: 4,
      questionText: 'In which of the following does dependency injection occur?',
      options: [
        { optionValue: '1', optionText: '@Injectable()' },
        { optionValue: '2', optionText: 'constructor' },
        { optionValue: '3', optionText: 'function' },
        { optionValue: '4', optionText: 'NgModule' },
      ],
      answer: '2',
      explanation: 'object instantiations are taken care of by the constructor in Angular',
      selectedOption: ''
    }
  ];


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
