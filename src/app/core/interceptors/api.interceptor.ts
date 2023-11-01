import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiRequest = request.clone({ 
            url: `http://localhost:5000/api${request.url}`,
            setHeaders: { "api-version": "1.0" }
        });

        return next.handle(apiRequest);
    }
}
