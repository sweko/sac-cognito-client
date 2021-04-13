import { Component } from '@angular/core';
import { CognitoService } from './services/cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-client';
  isLoginActive=false;
  isSignUpActive=false;
  hasUser=false;

  email:string = "";
  password:string = "";

  constructor (private cognito: CognitoService) {
    //cognito.signUp("swekster@gmail.com", "Password12#");
  }

  showLogin() {
    this.isLoginActive = true;
    this.isSignUpActive = false;
  }

  showSignup() {
    this.isLoginActive = false;
    this.isSignUpActive = true;
  }

  async login() {
    try {
      await this.cognito.login(this.email, this.password);
    } catch (err) {
      console.log(err);
    }
  }

  async signUp() {
    try {
      await this.cognito.signUp(this.email, this.password);
    } catch (err) {
      console.log(err);
    }
  }
}
