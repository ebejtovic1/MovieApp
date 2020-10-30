import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/movies/movie.service';
import { Movie } from 'src/app/movies/movie.model';
import { HostListener } from '@angular/core';
import { last } from 'rxjs/operators';

import { SharedService } from 'src/app/shared.service';
var timer=0;
var lastSearch='';
@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.css']
})
export class MoviesViewComponent implements OnInit, OnDestroy {
  search:string='';
  save(event: any) {

    this.newSearch(event.target.value);

    var root=this;
    clearTimeout(timer);
    timer=setTimeout(function(){
      lastSearch=event.target.value;

          root.newSearch(event.target.value);

      if(event.target.value.length>=3){
      root.moviesService.getSearchMovies(event.target.value);
      root.moviesSub = root.moviesService
        .getPostUpdateListener()
        .subscribe((movies: Movie[]) => {
          root.movies = movies;


        });}

        else{
          root.moviesService.getMovies();
    root.moviesSub = root.moviesService
      .getPostUpdateListener()
      .subscribe((movies: Movie[]) => {
        root.movies = movies;


      });

        }
      }, 1000);

  }

  function(){}


  movies: Movie[] = [];
  searchMovies: string = '';
  private moviesSub: Subscription;
  constructor(private moviesService: MoviesService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.lastSearch.subscribe(search => this.search = search);
    this.sharedService.lastSearch.subscribe(
      (res) => lastSearch=res,

    );

    this.searchMovies=lastSearch;
    if(lastSearch.length>=3){
      this.moviesService.getSearchMovies(lastSearch);
      this.moviesSub = this.moviesService
        .getPostUpdateListener()
        .subscribe((movies: Movie[]) => {
          this.movies = movies;


        });}

        else{
          this.moviesService.getMovies();
    this.moviesSub = this.moviesService
      .getPostUpdateListener()
      .subscribe((movies: Movie[]) => {
        this.movies = movies;


      });

        }
  }

  newSearch(search:string) {
    this.sharedService.nextMessage(search);
  }

  ngOnDestroy() {
    this.moviesSub.unsubscribe();
  }
}
