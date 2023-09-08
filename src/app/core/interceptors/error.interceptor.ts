import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError  } from "rxjs";
import { ServerErrorResponse, IsServerErrorResponse } from "../model/error-response.model";

@Injectable({ providedIn: "root" })
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error : HttpErrorResponse) => throwError(() => {
            if (error instanceof ErrorEvent) {
                return new Error("Client error");
            }

            let response = error.error;
            if (response instanceof ArrayBuffer) {
                const decoder = new TextDecoder();
                const decodedValue = decoder.decode(response);
                response = JSON.parse(decodedValue);
            }
            
            if (IsServerErrorResponse(response)) {
                const errorResponse = response as ServerErrorResponse;

                if (errorResponse.errors.length > 0) {
                    return new Error(errorResponse.errors[0]);
                }
            }
            
            return new Error("Unknown Error");
        })));
    }
}
