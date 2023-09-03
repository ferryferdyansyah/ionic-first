import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.action";
import { loginEffects } from "./login.effects"
import { provideMockActions } from "@ngrx/effects/testing"
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/User";

describe('Login effect', () => {

    let effects: loginEffects;
    let actions$: Observable<Action>
    let error = {error: 'error'}
    let user = new User();
    user.id = "anyUserId";
    
    let authServiceMock = {
        recoverEmailPassword: (email: string) => {
            if(email == "error@email.com"){
                return throwError(error)
            }
            return of({})
        },
        login: (email: string, password: string) => {
            if(email == "error@email.com"){
                return throwError(error)
            }
            return of(user);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([loginEffects])
            ],
            providers: [
                provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, {useValue: authServiceMock})
        effects = TestBed.get(loginEffects)
    })

    it('should recover password with existing email return success', (done) => {
        actions$ = of(recoverPassword({email: "any@email.com"}))

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordSuccess());
            done()
        })
    });

    it('should recover password with not existing email return an error', (done) => {
        actions$ = of(recoverPassword({email: "error@email.com"}))

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordFail({error}));
            done()
        })
    });

    it('should login with valid credentials return success', done => {
        actions$ = of(login({email: "valid@email.com", password: "anyPassword"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginSuccess({user}))
            done()
        })
    })

    it('should login with invalid credentials return error', done => {
        actions$ = of(login({email: "error@email.com", password: "anyPassword"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginFail({error}))
            done()
        })
    })

})