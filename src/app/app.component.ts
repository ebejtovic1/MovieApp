import { Component } from '@angular/core';
import { SharedService } from "./shared.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search:string;
  title = 'movie-mood';

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.lastSearch.subscribe(search => this.search = search)
  }
}
