import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, } from 'src/app/api.service';
import { Chats, Message } from 'src/app/modals/chats';


@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  id: string = '';
  singleChat: Chats;
  message: Message;
  imgUrl: string; 
  users: string = ''; 
  title: string = ''; 



  constructor(private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiService.getSingleChat(this.id).subscribe((result) => {
      console.log(result),
        this.singleChat = result;
        this.title = result.title; 
        this.imgUrl = result.imageUrl; 
        this.users = result.users[0].nickname; 
        this.message.message=result.messages[0].message;
      });
  }

}
