import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);
  if(req.url.search("auth")===-1){
    req=req.clone(
      {
        setHeaders:{
          token: localStorage.getItem("token")!
        }
      }
    )
  }
  
  return next(req);
};
