import { Movie } from './movie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MoviesService {

  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getMovies() {
    this.http
      .get<{ results: any }>('https://api.themoviedb.org/3/movie/top_rated?api_key=67a4974b455f38fac6d23b0e9cf0685d&language=en-US')
      .pipe(
        map((movieData) => {
          // _id to id
          return movieData.results.map((movie) => {
            return {
              title: movie.title,
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
        this.movies = transformedPosts;
        this.moviesUpdated.next([...this.movies]);
      });
  }
  getSearchMovies(query: string){
    query='https://api.themoviedb.org/3/search/movie?api_key=67a4974b455f38fac6d23b0e9cf0685d&language=en-US&query='+query;
    this.http
      .get<{ results: any }>(query)
      .pipe(
        map((movieData) => {
          // _id to id
          return movieData.results.map((movie) => {
            return {
              title: movie.title,
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
        this.movies = transformedPosts;
        this.moviesUpdated.next([...this.movies]);
      });

  }

  getPostUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  getVideo(id:number){
    return this.http.get<{
      results: [{
        type: string;
        site: string;
        key : string;
      }
      ]
    }>('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=67a4974b455f38fac6d23b0e9cf0685d&language=en-US');
  }

  getMovie(id: number) {
    return this.http.get<{
      id: number;
      title: string;
      overview: string;
      release_date: string;
      poster_path: string;
      vote_average: number;
    }>('https://api.themoviedb.org/3/movie/'+id+'?api_key=67a4974b455f38fac6d23b0e9cf0685d&language=en-US');
  }
}
