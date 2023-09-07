import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError  } from "rxjs";
import { ErrorResponse, IsErrorResponse } from "../model/error-response.model";

@Injectable({ providedIn: "root" })
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error : HttpErrorResponse) => throwError(() => {
            if (error instanceof ErrorEvent) {
                return new Error("Client error");
            }
            
            if (IsErrorResponse(error.error)) {
                const errorResponse = error.error as ErrorResponse;

                if (errorResponse.errors.length > 0) {
                    return new Error(errorResponse.errors[0]);
                }
            }
            
            return new Error("Unknown Error");
        })));
    }
}
