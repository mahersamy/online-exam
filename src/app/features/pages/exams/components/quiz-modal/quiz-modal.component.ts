import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomModalComponent } from "../../../../../shared/components/ui/custom-modal/custom-modal.component";
import { QuizService } from '../../../../../shared/services/quiz/quiz.service';
import { QuizResponse } from '../../../../../shared/interfaces/quiz/quiz-response';

@Component({
  selector: 'app-quiz-modal',
  imports: [CustomModalComponent],
  templateUrl: './quiz-modal.component.html',
  styleUrl: './quiz-modal.component.scss'
})
export class QuizModalComponent implements OnInit {
  private readonly _quizService=inject(QuizService);



  quizes!:Array<QuizResponse>
  currentQuiz!:QuizResponse;
  curentQuizNumber:number=3;
  isModalOpen = signal(true);

  ngOnInit(): void {
    this.getAllQuizOnExam()
    this.currentQuiz=this.quizes[0];
  }


  getAllQuizOnExam(){
    this._quizService.getAllQuizOnExams("670070a830a3c3c1944a9c63").subscribe({
      next:(res)=>{
        this.quizes=res;
      },
      error:(err)=>{console.log(err)}
    })
  }


  closeModal() {
    this.isModalOpen.set(false);
  }

  openModal(){
    this.isModalOpen.set(true);

  }

}
