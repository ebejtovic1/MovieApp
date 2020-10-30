import { TV } from './tv.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TvsService {

  private tvs: TV[] = [];
  private tvsUpdated = new Subject<TV[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getMovies() {
    this.http
      .get<{ results: any }>('https://api.themoviedb.org/3/tv/top_rated?api_key=67a4974b455f38fac6d23b0e9cf0685d&language=en-US')
      .pipe(
        map((tvData) => {
          // _id to id
          return tvData.results.map((tv) => {
            return {
              name: tv.name,
              id: tv.id,
              overview: tv.overview,
              release_date: tv.release_date,
              vote_average: tv.vote_average,
              poster_path: 'https://image.tmdb.org/t/p/w500/'+tv.poster_path,

            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.tvs = transformedPosts;
        this.tvsUpdated.next([...this.tvs]);
      });
  }


  getPostUpdateListener() {
    return this.tvsUpdated.asObservable();
  }

  getVideoTv(id:number){
    return this.http.get<{
      results: [{
        type: string;
        site: string;
        key : string;
      }
      ]
    }>('https://api.themoviedb.org/3/tv/'+id+'/videos?api_key=67a4974b455f38fac6d23b0e9cf0685d&language=en-US');
  }

  getSearchTvs(query: string){
    query='https://api.themoviedb.org/3/search/tv?api_key=67a4974b455f38fac6d23b0e9cf0685d&language=en-US&query='+query;
    this.http
      .get<{ results: any }>(query)
      .pipe(
        map((movieData) => {
          // _id to id
          return movieData.results.map((movie) => {
            return {
              name: movie.name,
              id: movie.id,
              overview: movie.overview,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              poster_path: 'https://image.tmdb.org/t/p/w500/'+movie.poster_path,

            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.tvs = transformedPosts;
        this.tvsUpdated.next([...this.tvs]);
      });

  }


  getTv(id: number) {
    return this.http.get<{
      id: number;
      name: string;
      overview: string;
      release_date: string;
      poster_path: string;
      vote_average: number;

    }>('https://api.themoviedb.org/3/tv/'+id+'?api_key=67a4974b455f38fac6d23b0e9cf0685d&language=en-US');
  }
}
