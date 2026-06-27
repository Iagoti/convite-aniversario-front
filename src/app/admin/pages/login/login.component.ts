import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({selector:'app-login',standalone:true,imports:[FormsModule],templateUrl:'./login.component.html',styleUrl:'./login.component.scss'})
export class LoginComponent{email='admin@isabella.com';senha='123456';erro='';constructor(private auth:AuthService,private router:Router){} entrar(){if(this.auth.login(this.email,this.senha)) this.router.navigate(['/admin/dashboard']); else this.erro='E-mail ou senha inválidos';}}
