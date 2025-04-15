import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../shared/services/exam/exam.service';
import { ExamResponse } from '../../../shared/interfaces/exams/exam-response';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CustomModalComponent } from "../../../shared/components/ui/custom-modal/custom-modal.component";
import { QuizModalComponent } from "../quizs/quiz-modal.component";
import { QuizCorrectAwnserComponent } from "../quizs/components/quiz-correct-awnser/quiz-correct-awnser.component";
import { QuizScoreComponent } from "../quizs/components/quiz-score/quiz-score.component";

@Component({
  selector: 'app-exams',
  imports: [QuizModalComponent, CustomModalComponent, QuizCorrectAwnserComponent, QuizScoreComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _examService=inject(ExamService);
  private readonly _toastrService = inject(ToastrService);
  private readonly destroy$ = new Subject<void>();

  exams!:ExamResponse[]  
  id!:string;
  examId!:string;
  isModalOpen = signal(false);
  loading:boolean=false;
  showDialogExam=signal(false);


  ngOnInit(): void {
    this.getId();
    this.getAllExamsOnSubjectId();
  }

  
  closeModal() {
    this.isModalOpen.set(false);
  }

  openModal(examId:string){
    this.examId=examId;
    this.isModalOpen.set(true);

  }


  startExam(){
    this.showDialogExam.set(false);

    setInterval(()=>this.showDialogExam.set(true),10)
    this.closeModal();
  }

  getId() {
    this._activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: (res:any) => {
          this.id=res.params.id;
        },
        error: (error) => { 
          this._toastrService.error(error.error.message);
        },
      }
    )
  }

  getAllExamsOnSubjectId(){
    this.loading=true;
    this._examService.getAllExamsOnSubject(this.id).subscribe({
      next:(res)=>this.exams=res,
      error:(error)=>this._toastrService.error(error.error.message),
      complete:()=>this.loading=false
    })
  }

}
