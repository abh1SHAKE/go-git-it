import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith(environment.backendUrl)) {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next(authReq);
        }
    }
    
    return next(req);
};