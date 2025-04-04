import { inject, Injectable } from '@angular/core';
import { SubjectsApi } from '../../../core/base/subject/SubjectAPI';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from 'auth-api';

import { SubjectResponse } from '../../interfaces/subjects/subject-response';
import { EndPoints } from '../../../core/enums/SubjectAPI.endPoints';
import { SubjectApiAdaptorService } from '../../../core/adaptors/subject-api-adaptor.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService implements SubjectsApi {
  private readonly _httpClient = inject(HttpClient);
  private readonly _Api_BASE = inject(API_BASE_URL);
  private readonly _subjectApiAdaptorService = inject(SubjectApiAdaptorService);
  token = typeof window !== 'undefined' ? localStorage.getItem('token')! : '';

  getAllSubjects(isLimit: boolean = true): Observable<Array<SubjectResponse>> {
    let finalUrl: string = this._Api_BASE + EndPoints.SUBJECTS;
    if (isLimit) {
      finalUrl = this._Api_BASE + EndPoints.SUBJECTS + '?limit=6';
    }

    return this._httpClient
      .get(finalUrl, {
        headers: {
          token: this.token,
        },
      })
      .pipe(
        map(
          (res: any) => this._subjectApiAdaptorService.adapt(res.subjects),
          catchError((error) => {
            return throwError(() => error);
          })
        )
      );
  }
}
