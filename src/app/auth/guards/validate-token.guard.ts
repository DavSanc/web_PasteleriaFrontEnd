import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take, tap } from 'rxjs';

export const validateTokenGuard: CanActivateFn = (route, state) => {
  const
    authService = inject( AuthService ),
    router = inject( Router );

  console.log( 'validateTokenGuard' );

  return authService.validateToken()
    .pipe(
      tap( valid => {
        if( ! valid ) {
          router.navigate([ '/auth/login' ])
        }
      })
    );
};
