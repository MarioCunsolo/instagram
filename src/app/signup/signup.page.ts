import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  nickname: string = '';
  phone: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async presentToast(message: string, status: string) {
    const toast = await this.toastController.create({
      message,
      icon:
        status === 'ok' ? 'checkmark-circle-outline' : 'alert-circle-outline',
      color: status === 'ok' ? 'medium' : 'danger',
      duration: 2000,
    });
    toast.present();
  }

  signUp = () =>
    this.apiService.signUp(this.nickname, this.phone, this.password).subscribe(
        (response) => this.presentToast('Utente verificato!', 'ok'),

        ({ status }: { status: number }) =>
          status === 400
            ? this.presentToast('Dati insertiti non validi', 'error')
            : this.presentToast("C'è stato un errore. Riprova", 'error')
      );

}