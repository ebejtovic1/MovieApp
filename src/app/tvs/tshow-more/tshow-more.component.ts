import { Component, OnInit } from '@angular/core';
import { TvsService} from 'src/app/tvs/tv.service';
import { TV } from 'src/app/tvs/tv.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tshow-more',
  templateUrl: './tshow-more.component.html',
  styleUrls: ['./tshow-more.component.css']
})
export class TshowMoreComponent implements OnInit {
  public safeURL: SafeResourceUrl;
  constructor(private route: ActivatedRoute, private tvsService: TvsService, private _sanitizer: DomSanitizer, private _location: Location, private authService: AuthService) { }

  userIsAuthenticated = false;
     userId: string;
  private authStatusSub: Subscription;
  backClicked() {
    this._location.back();
  }

  changes(){

    var FileSaver = require('file-saver');
    var inputValue = (<HTMLInputElement>document.getElementById("change")).value;
    this.tv.name= inputValue;
    let jsonData = JSON.stringify(this.tv);
    var blob = new Blob([jsonData], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "change.json");

  }

tv: TV = {
  id: -1,
  name: '',
  overview: '',
  poster_path: '',
  vote_average: 0.0,
  video_path: ''
};
private tvId: number;
  isLoading = false;
  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('tvId')) {
        this.tvId = parseInt(paramMap.get('tvId'));
        this.isLoading = true;
        this.tvsService.getTv(this.tvId).subscribe((postData) => {
          this.isLoading = false;
          this.tvsService.getVideoTv(this.tvId).subscribe((postVideo) => {
            this.tv = {
              id: postData.id,
              name: postData.name,
              overview: postData.overview,
              poster_path: 'https://image.tmdb.org/t/p/w500/'+ postData.poster_path,
              vote_average: postData.vote_average,
              video_path: ''

            };

            for (let index = 0; index < postVideo.results.length; index++) {
            if(postVideo.results[index].type==='Trailer' && postVideo.results[index].site==='YouTube'){
              this.tv.video_path='https://youtube.com/embed/'+postVideo.results[index].key;
            }

          }


        });
        });


      }
    });
  }

  getTrustedUrl(url:any){
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
}
}






