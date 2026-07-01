import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({selector:'app-login',standalone:true,imports:[FormsModule],templateUrl:'./login.component.html',styleUrl:'./login.component.scss'})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';
  carregando = false;

  constructor(private auth: AuthService, private router: Router) {}

  entrar() {
    this.erro = '';
    this.carregando = true;
    this.auth.login(this.email, this.senha).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: () => {
        this.erro = 'E-mail ou senha inválidos';
        this.carregando = false;
      },
    });
  }
}
