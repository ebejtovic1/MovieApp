import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TvsService} from 'src/app/tvs/tv.service';
import { TV } from 'src/app/tvs/tv.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Location} from '@angular/common';
@Component({
  selector: 'app-tshow-more',
  templateUrl: './tshow-more.component.html',
  styleUrls: ['./tshow-more.component.css']
})
export class TshowMoreComponent implements OnInit {
  public safeURL: SafeResourceUrl;
  constructor(private route: ActivatedRoute, private tvsService: TvsService, private _sanitizer: DomSanitizer, private _location: Location) { }

  backClicked() {
    this._location.back();
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






