import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe = false;
  email: string;

  auth2: any;

  constructor(private router: Router, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleinit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.rememberMe = true;
    }

  }

  googleinit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '173343899169-l7vn4u5r99bhb5pbt7tjgol6p4n72gsh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });


  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token).subscribe( () => {
        window.location.href = '#/dashboard';
      });
    });

  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login(usuario, this.rememberMe)
    .subscribe( loginOk => {
      this.router.navigate(['/dashboard']);
    });
  }

}
