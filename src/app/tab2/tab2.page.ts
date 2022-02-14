import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private apiService: ApiService) { }

  message: string = '';
  imageUrl: string = '';

  createFeeds = () =>
    this.apiService.createFeeds(this.message, this.imageUrl).subscribe((response) => { console.log("Fatto") });
}
