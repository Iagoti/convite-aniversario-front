import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({selector:'app-admin-layout',standalone:true,imports:[RouterOutlet,RouterLink,RouterLinkActive],templateUrl:'./admin-layout.component.html',styleUrl:'./admin-layout.component.scss'})
export class AdminLayoutComponent{constructor(private auth:AuthService,private router:Router){} sair(){this.auth.logout();this.router.navigate(['/admin/login'])}}
