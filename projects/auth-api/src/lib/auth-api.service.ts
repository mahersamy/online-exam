import { inject, Injectable } from '@angular/core';
import { AuthApi } from './base/AuthAPI';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthAPIAdaptorService } from './adaptors/auth-apiadaptor.service';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from './enums/AuthAPI.endPoints';
import { LoginData } from './interfaces/loginData';
import { LoginResponse } from './interfaces/loginResponse';
import { RegisterResponse } from './interfaces/registerResponse';
import { RegisterData } from './interfaces/registerData';
import { API_BASE_URL } from './token/api-token';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthApi{
  private readonly _authAPIAdaptorService=inject(AuthAPIAdaptorService)
  private readonly _httpClient=inject(HttpClient)
  private readonly _Api_BASE=inject(API_BASE_URL)

  login(data: LoginData): Observable<LoginResponse> {
    console.log(this._Api_BASE);
    return this._httpClient.post(this._Api_BASE+AuthEndPoint.LOGIN,data).pipe(map((res)=>this._authAPIAdaptorService.adapt(res)),catchError(
      (error)=>{
        return throwError(() => error);
      }
    )
    )
  }

  register(data: RegisterData): Observable<RegisterResponse> {
    return this._httpClient.post(this._Api_BASE+AuthEndPoint.REGISTER,data).pipe(map((res)=>this._authAPIAdaptorService.adapt(res)),catchError(
      (error)=>{
        return throwError(() => error);
      }
    )
    )
  }

  forgetPassword(data: any): Observable<any> {
    return this._httpClient.post(this._Api_BASE+AuthEndPoint.FORGETPASSWORD,data)
  }

  verifyCode(data: any): Observable<any> {
    return this._httpClient.post(this._Api_BASE+AuthEndPoint.VERIFYCODE,data)
  }

  resetPassowrd(data: any): Observable<any> {
    return this._httpClient.put(this._Api_BASE+AuthEndPoint.RESETPASSWORD,data)
  }
}
