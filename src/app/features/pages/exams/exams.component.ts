import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../shared/services/exam/exam.service';
import { ExamResponse } from '../../../shared/interfaces/exams/exam-response';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exams',
  imports: [],
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


  ngOnInit(): void {
    this.getId();
    this.getAllExamsOnSubjectId();
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
    this._examService.getAllExamsOnSubject(this.id).subscribe({
      next:(res)=>this.exams=res,
      error:(error)=>this._toastrService.error(error.error.message),
    })
  }

}
