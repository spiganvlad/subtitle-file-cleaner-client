import { HttpInterceptorFn } from "@angular/common/http";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const apiRequest = req.clone({ 
        url: `http://localhost:5000/api${req.url}`,
        setHeaders: { "api-version": "1.0" }
    });

    return next(apiRequest);
};