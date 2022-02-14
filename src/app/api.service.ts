import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  accessToken: string;
  token: string = "";

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
    //this.accessToken = accessToken;
  }
  
  async get(key: string) {
    await this.storage?.get(key);
    console.log("storage key"+ await this.storage?.get(key))
  }


  async init() {
    const storage = await this.storage.create();
    this. storage = storage;

    this.token = await this.storage?.get('accessToken');
    console.log("Letto da storage: "+ this.token);
  }

  createFeeds = (message: string, imageUrl: string) =>
    this.http.post("https://feeds-fake.herokuapp.com/feeds", {
      message,
      imageUrl,
    }, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`), });

  me = () => this.http.get('https://feeds-fake.herokuapp.com/me');

  signUp = (
    nickname: string,
    password: string,
  ) =>
    this.http.post('https://feeds-fake.herokuapp.com/signin', {
      nickname,
      password,
    });

  signIn = (nickname: string, password: string) =>
    this.http.post('https://feeds-fake.herokuapp.com/login', {
      nickname,
      password,
    });

  refreshToken = (refreshToken: string) =>
    this.http.post('https://feeds-fake.herokuapp.com/login', {
      grantType: 'refresh_token',
      refreshToken,
    });

  getFeeds = () => this.http.get('https://feeds-fake.herokuapp.com/feeds');


}