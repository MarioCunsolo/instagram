import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  infos: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.me().subscribe(
      (response) => {
        console.log(response)
        this.infos = response
      }
      );
  }

}
