import { HttpInterceptorFn } from "@angular/common/http";
import { throwError  } from "rxjs";
import { catchError } from "rxjs/operators";
import { ServerErrorResponse, IsServerErrorResponse } from "../model/error-response.model";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(catchError((err) => throwError(() => {
        if (err instanceof ErrorEvent) {
            return new Error("Client error");
        }

        let response = err.error;
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
    })))
};