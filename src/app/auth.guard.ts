import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const isUserLogin = localStorage.getItem('login-data');
  if (isUserLogin !== null) {
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }
};
