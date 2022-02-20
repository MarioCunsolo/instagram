import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { Chats } from 'src/app/modals/chats';


@Injectable({
  providedIn: 'root',
})

export class ApiService {

  accessToken: string;
  token: string = "";

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async get(key: string) {
    await this.storage?.get(key);
    console.log("storage key" + await this.storage?.get(key))
  }


  async init() {
    const storage = await this.storage.create();
    this.storage = storage;

    this.token = await this.storage?.get('accessToken');
    console.log("Letto da storage: " + this.token);
  }

  createFeeds = (message: string, imageUrl: string) =>
    this.http.post("https://feeds-fake.herokuapp.com/feeds", {
      message,
      imageUrl,
    }, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    });

  me = () => this.http.get('https://feeds-fake.herokuapp.com/me');

  signUp = (
    nickname: string,
    phone: string,
    password: string,
  ) =>
    this.http.post('https://feeds-fake.herokuapp.com/signin', {
      nickname,
      phone,
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

  getChats = () => this.http.get('https://feeds-fake.herokuapp.com/chats');

  createChats = (title: string, imageUrl: string) =>
    this.http.post("https://feeds-fake.herokuapp.com/chats", {
      title,
      imageUrl,
    }, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    });

  getSingleChat = (id:string):Observable<Chats> => {
    return this.http.get<Chats>(`https://feeds-fake.herokuapp.com/chats/${id}`)
  }

  addMessage = (id: string) => {
    return this.http.get(`https://feeds-fake.herokuapp.com/chats/${id}/messages`)
  }

  joinChat = (id: string) => {
    return this.http.put<Chats>(`https://feeds-fake.herokuapp.com/chats/${id}`, {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    })
  
  }
  

}

