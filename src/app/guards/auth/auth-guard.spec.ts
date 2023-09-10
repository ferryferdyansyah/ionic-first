import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { User } from 'src/app/model/user/User';
import { AppState } from 'src/store/AppState';
import { loginSuccess } from 'src/store/login/login.action';
import { loginReducer } from 'src/store/login/login.reducer';

import { AuthGuard } from './auth-guard';

describe('AuthGuardService', () => {
  let service: AuthGuard;
  let store: Store<AppState>
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer),
      ]
    });
    service = TestBed.inject(AuthGuard);
    store = TestBed.get(Store)
  });

  it('should allow logged user to  access page', () => {
    store.dispatch(loginSuccess({user: new User()}))
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy()
    })
  });

  it('should not allow acces to page if user is not logged in', () => {
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy()
    })
  })

  it('should not allowed user  be sent to the login page', () => {
    spyOn(router, 'navigateByUrl')
    guard.canLoad().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login')
    })
  })

});
