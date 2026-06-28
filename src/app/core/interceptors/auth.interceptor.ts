import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('admin_token');
  if (!token || request.url.endsWith('/auth/login')) return next(request);
  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
