import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SignInPage {
  nickname: string = '';
  password: string = '';
  accessToken: string ="";
  grantType: string= "";
  token: string = "";

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router,
    private storage: Storage
  ) {

    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  async presentToast(message: string, status: string) {
    const toast = await this.toastController.create({
      message,
      icon: (status = 'ok'
        ? 'checkmark-circle-outline'
        : 'alert-circle-outline'),
      color: status === 'ok' ? 'medium' : 'success',
      duration: 2000,
    });
    toast.present();
  }

  async get(key: string) {
    await this.storage?.get(key);
  }

  signIn = () =>
    this.apiService.signIn(this.nickname, this.password).subscribe(
      async ({
        accessToken,
        grantType,
      }: {
        accessToken: string;
        grantType: string;
      }) => (
        console.log("Access token preso: "+accessToken+ "::::::   "+grantType),
        this.storage.set('accessToken', accessToken),
        this.storage.set('grantType', grantType),

        this.token = await this.storage?.get('accessToken'),
        console.log("Letto da storage: "+ this.token),
        
        this.presentToast('Login Effettuato!', 'ok'),
        this.router.navigate(['/tabs/tab1'])
      ),
      ({ status }: { status: number }) =>
        status === 400
          ? this.presentToast('Credenziali Errate', 'error')
          : this.presentToast("C'è stato un problema. Riprova", 'error')
    );
}