import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(@Inject('BASE_URL') private baseUrl: string) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req.clone();
        const token = localStorage.getItem('token')
        
        if (newReq.url) {
            newReq = req.clone({
                url: `${this.baseUrl}/${req.url}`
            });
        }
        if(token){
            newReq = newReq.clone({
                headers: req.headers.set(
                  'Authorization',
                  'Bearer ' + token
                )
              });
        }
        return next.handle(newReq).pipe(
            map((event) => {
                if (event instanceof HttpResponse) {
                    return event.clone({ body: event.body.data || event.body });
                } else {
                    return event;
                }
            }),

        );
    }
}