import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
// import { Observable, of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { User } from 'src/app/model/user/User';
// import { AuthService } from 'src/app/services/auth/auth.service';
// import { recoverPassword } from 'src/store/login/login.action';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { login, loginFail, loginSuccess, recoverPasswordFail, recoverPasswordSuccess, recoverPassword } from 'src/store/login/login.action';
import { loginReducer } from 'src/store/login/login.reducers';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>
  let toastController: ToastController;

  // Inisialisasi

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        // IonicModule.forRoot(),
        AppRoutingModule, 
        ReactiveFormsModule, 
        StoreModule.forRoot([]), 
        StoreModule.forFeature("loading", loadingReducer), 
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents() 
    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController)

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should create form init', () => {
    component.ngOnInit();

    expect(component).not.toBeUndefined();
  });
  
  it('should go to register page', () => {
    spyOn(router, 'navigate');
    component.register();

    expect(router).toHaveBeenCalledWith(['register']);
  });
  
  it('should recover email/password on forgot email/password', () => {
    // start page
    fixture.detectChanges()
    // user set valid email
    component.form.get('email')?.setValue("valid@email.com")
    // user clicked on forgot email/password button
    page.querySelector("#recoverPasswordButton").click()
    // expect loginState.isRecoveringPassword is true
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy()
    })
    // verify loadingState.show == true
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy()
    })
  });

  it('given user is recovering password, when success, then hide loading and show success message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}))
    // start page
    fixture.detectChanges()
    // set login state as recovering password
    store.dispatch(recoverPassword({email: "any@email.com"}))
    // set login state as recovered password
    store.dispatch(recoverPasswordSuccess())
    // verify loadingState.show == false
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy()
    })
    // verify message was shown
    expect(toastController.create).toHaveBeenCalledTimes(1)
  })

  it('given user is recovering password, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}))
    // start page
    fixture.detectChanges()
    // recover password
    store.dispatch(recoverPassword({email: "any@email.com"}))
    // recover password fail
    store.dispatch(recoverPasswordFail({error: "message"}))
    // expect loading not showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy()
    })
    // error message was shown
    expect(toastController.create).toHaveBeenCalledTimes(1)
  })

  it('should show loading and start login when logging in', () => {
    // start page
    fixture.detectChanges()
    // set valid email
    component.form.get('email')?.setValue('valid@email.com')
    // set any password
    component.form.get('password')?.setValue('anyPassword')
    // click on login button
    page.querySelector('#loginButton').click()

    // expect loading is showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy()
    })
    // expeng logging in
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy()
    })
  })

  it('given user is logging in, when success, then hide loading and send user to home page', () => {
    spyOn(router, 'navigate')
  
    // start page
    fixture.detectChanges();
    // set valid email
    store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
    store.dispatch(loginSuccess({user: new User()}));

    // expect loading is hidden
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    // expect logged in
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })
    // expect home page showing
    expect(router.navigate).toHaveBeenCalledWith(['home'])
  })

  it('given user is logging in, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}))
    // start page
    fixture.detectChanges();
    // set valid email
    store.dispatch(login({email: "valid@email.com", password: "anyPassword"}))
    store.dispatch(loginFail({error: {message: 'error message'}}))
    // expect loading is hidden
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    // expect error message shown
    expect(toastController.create).toHaveBeenCalledTimes(1)
  })

});
