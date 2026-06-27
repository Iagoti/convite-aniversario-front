import { Injectable, signal } from '@angular/core';
@Injectable({providedIn:'root'})
export class AuthService{logado=signal(localStorage.getItem('admin_logado')==='S');login(email:string,senha:string){const ok=email==='admin@isabella.com'&&senha==='123456';if(ok){localStorage.setItem('admin_logado','S');this.logado.set(true)}return ok}logout(){localStorage.removeItem('admin_logado');this.logado.set(false)}}
