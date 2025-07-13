import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Verifica se o token existe no localStorage
  const token = localStorage.getItem('authToken');

  if (token) {
    return true;
  } else {
    console.log('Acesso negado! Redirecionando para /login');
    router.navigate(['/login']);
    return false;
  }
};
