import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.action';
import { login, recoverPassword } from 'src/store/login/login.action';
import { NavController, ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  loginStateSubscription!: Subscription;

  constructor(private router:Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private navController: NavController) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      // this.onIsRecoveringPassword(loginState);

      // this.onIsLoggingIn(loginState);
      this.onIsLoggedIn(loginState);

      this.onError(loginState);
      this.toggleLoading(loginState);
    })
  }

  ngOnDestroy() {
    if (this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState){
    if (loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState){
    if (loginState.isLoggedIn){
      this.navController.navigateRoot('home')
    }
  }

  // private onIsLoggingIn(loginState: LoginState){
  //   if (loginState.isLoggingIn){
  //     const email = this.form.get('email')?.value;
  //     const password = this.form.get('password')?.value;
  //     this.authService.login(email, password).subscribe(user => {
  //       this.store.dispatch(loginSuccess({user}));
  //     }, error => {
  //       this.store.dispatch(loginFail({error}));
  //     })
  //   }
  // }

  private async onError(loginState: LoginState){
    if(loginState.error){
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toaster.present();
    }
  }

  // private onIsRecoveringPassword(loginState: LoginState){
  //   if(loginState.isRecoveringPassword){
  //     this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(() => {
  //       this.store.dispatch(recoverPasswordSuccess());
  //     }, error => {
  //       this.store.dispatch(recoverPasswordFail({error}))
  //   });
  //   }
  // }

  private async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary"
      });
      toaster.present();
    }

  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));
  // forgotEmailPassword() {
  //   this.store.dispatch(show())

  //   setTimeout(() => {
  //     this.store.dispatch(hide())
  //   }, 3000);
  }

  login(){
    this.store.dispatch(login({email: this.form.get('email')?.value, password: this.form.get('password')?.value}));
  }

  register(){
    this.router.navigate(['register']);
  }

}
