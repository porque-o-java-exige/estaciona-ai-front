import { HttpInterceptorFn } from '@angular/common/http';

export const AUTH_TOKEN_STORAGE_KEY = 'estaciona_ai_token';
export const AUTH_USER_ID_STORAGE_KEY = 'estaciona_ai_user_id';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;
  try {
    token =
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
        : null;
  } catch {
    token = null;
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
