import { Component, effect, inject, input,OnInit,signal } from '@angular/core';

import { CustomModalComponent } from "../../../shared/components/ui/custom-modal/custom-modal.component";
import { QuizService } from '../../../shared/services/quiz/quiz.service';
import { QuizResponse } from '../../../shared/interfaces/quiz/quiz-response';
import { CustomTimerComponent } from "../../../shared/components/ui/custom-timer/custom-timer.component";
import { QuizButtonComponent } from "./components/quiz-button/quiz-button.component";
import { QuizStepperComponent } from "./components/quiz-stepper/quiz-stepper.component";
import { Awnsers } from '../../../shared/interfaces/quiz/awnsers';
import { QuizTitleComponent } from "./components/quiz-title/quiz-title.component";
import { QuizCorrectAwnserComponent } from "./components/quiz-correct-awnser/quiz-correct-awnser.component";

@Component({
  selector: 'app-quiz-modal',
  imports: [CustomModalComponent, CustomTimerComponent, QuizButtonComponent, QuizStepperComponent, QuizTitleComponent, QuizCorrectAwnserComponent],
  templateUrl: './quiz-modal.component.html',
  styleUrl: './quiz-modal.component.scss'
})
export class QuizModalComponent implements OnInit {
  private readonly _quizService=inject(QuizService);

  visable=input.required<boolean>();
  examId=input.required<string>();
  quizes!:Array<QuizResponse>;
  curentQuizNumber:number=1;
  isModalOpen = signal(false);
  startTime=signal(0);
  selectedAnswer:string | null=null;
  myAnswers:Array<Awnsers>=[];



  constructor(){
    effect(() => {
      this.isModalOpen.set(this.visable());
    });
  }

  ngOnInit(): void {
    this.getAllQuizOnExam();
    
  }


  next(id:string){
   if(this.selectedAnswer!==null){
    this.myAnswers[this.curentQuizNumber-1]={questionId:id,correct:this.selectedAnswer!};
   }
   if (this.curentQuizNumber !== this.quizes.length && this.selectedAnswer){
      this.curentQuizNumber++;
      console.log(this.myAnswers);
      this.loadCurrentQuestionAnswer()
      
   }
   
   if(this.curentQuizNumber-1 === this.quizes.length){
    this.closeModal();
   }
   
  }

  previous(){
    if(this.curentQuizNumber!==1){
      this.curentQuizNumber--;
      this.loadCurrentQuestionAnswer()
    }
  }


  getAllQuizOnExam(){
    this._quizService.getAllQuizOnExams(this.examId()).subscribe({
      next:(res)=>{
        this.quizes=res;
        this.startTime.set(this.quizes[this.curentQuizNumber-1].exam.duration);

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  closeModal() {
    this.curentQuizNumber=1;
    this.myAnswers = [];
    this.quizes = [];
    this.getAllQuizOnExam();
    this.isModalOpen.set(false);
  }

  loadCurrentQuestionAnswer() {
    const questionId = this.quizes[this.curentQuizNumber - 1]?._id;
    const previous = this.myAnswers.find(awnser => awnser.questionId === questionId);
    this.selectedAnswer = previous?.correct ?? null;
  }

  openModal() {
    this.isModalOpen.set(true);
  }

}
