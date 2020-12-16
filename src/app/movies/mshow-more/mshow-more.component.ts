import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/movies/movie.model';
import { MoviesService } from 'src/app/movies/movie.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-mshow-more',
  templateUrl: './mshow-more.component.html',
  styleUrls: ['./mshow-more.component.css']
})
export class MshowMoreComponent implements OnInit {
  public safeURL: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
    private jobsService: MoviesService, private _sanitizer: DomSanitizer, private _location: Location, private authService: AuthService) {
     }
     userIsAuthenticated = false;
     userId: string;
  private authStatusSub: Subscription;


     backClicked() {
       console.log(this.movie.title);
      this._location.back();
    }

    changes(){

      var FileSaver = require('file-saver');




      var inputValue = (<HTMLInputElement>document.getElementById("change")).value;
      this.movie.title= inputValue;
      let jsonData = JSON.stringify(this.movie);
      var blob = new Blob([jsonData], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "change.json");

    }



movie: Movie = {
  id: -1,
  title: '',
  overview: '',
  release_date: '',
  poster_path: '',
  vote_average: 0.0,
  video_path: ''
};

private movieId: number;
  isLoading = false;

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('movieId')) {
        this.movieId = parseInt(paramMap.get('movieId'));
        this.isLoading = true;
        this.jobsService.getMovie(this.movieId).subscribe((postData) => {
          this.isLoading = false;
          this.jobsService.getVideo(this.movieId).subscribe((postVideo) => {
            this.movie = {
              id: postData.id,
              title: postData.title,
              overview: postData.overview,
              release_date: postData.release_date,
              poster_path: 'https://image.tmdb.org/t/p/w500/'+ postData.poster_path,
              vote_average: postData.vote_average,
              video_path: ''

            };

            for (let index = 0; index < postVideo.results.length; index++) {
            if(postVideo.results[index].type==='Trailer' && postVideo.results[index].site==='YouTube'){
              this.movie.video_path='https://youtube.com/embed/'+postVideo.results[index].key;
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

