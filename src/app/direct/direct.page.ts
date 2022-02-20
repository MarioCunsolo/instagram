import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-direct',
  templateUrl: './direct.page.html',
  styleUrls: ['./direct.page.scss'],
})
export class DirectPage implements OnInit {

  chats: any;
  title: string = '';
  imageUrl: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getChats().subscribe(
      (response) => {this.chats = response, console.log(response)});
  }

  createChats = () =>
  this.apiService.createFeeds(this.title, this.imageUrl).subscribe((response) => { console.log("Fatto") });
}

