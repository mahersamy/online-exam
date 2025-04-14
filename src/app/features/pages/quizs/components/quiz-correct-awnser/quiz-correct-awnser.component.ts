import { Component, Input, input, OnInit, output } from '@angular/core';
import { CustomModalComponent } from "../../../../../shared/components/ui/custom-modal/custom-modal.component";
import { Awnsers } from '../../../../../shared/interfaces/quiz/awnsers';
import { QuizResponse } from '../../../../../shared/interfaces/quiz/quiz-response';
import { CorrectAnswer } from '../../../../../shared/interfaces/quiz/correct-awnser';

@Component({
  selector: 'app-quiz-correct-awnser',
  imports: [CustomModalComponent],
  templateUrl: './quiz-correct-awnser.component.html',
  styleUrl: './quiz-correct-awnser.component.scss'
})
export class QuizCorrectAwnserComponent implements OnInit {

  myAwnsers=input.required<Array<Awnsers>>()
  visable=input.required<boolean>();
  close=output<void>()
  @Input({ required: true }) quizes!: Array<QuizResponse>;

finalArray:CorrectAnswer[]=[];


ngOnInit(): void {
  this.myAwnserIsCorrect();
  console.log(this.finalArray);
}
  


  myAwnserIsCorrect(){
    for (let i = 0; i < this.quizes.length; i++) {
      const correct = this.quizes[i].correct;
      const myAwnser = this.myAwnsers()[i].correct;
      const questionId = this.quizes[i]._id;
      const questionWnserId = this.myAwnsers()[i].questionId;
      const question=this.quizes[i].question
      if(correct!==myAwnser && questionId===questionWnserId){
        this.finalArray.push({questionId:questionId,correct:correct,myAnswer:myAwnser});
      
    }

  
  }
  }

  closeModal(){
    this.close.emit()
  }
}
