import { Component, Input, OnInit, Output } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { TvsService } from 'src/app/tvs/tv.service';
import { TV } from 'src/app/tvs/tv.model';
import { AppComponent } from 'src/app/app.component';
import { MoviesViewComponent } from 'src/app/movies/movies-view/movies-view.component';
import { SharedService } from 'src/app/shared.service';
var timer=0;
var lastSearch='';
@Component({
  selector: 'app-tvs-view',
  templateUrl: './tvs-view.component.html',
  styleUrls: ['./tvs-view.component.css'],
  providers:[MoviesViewComponent]
})
export class TvsViewComponent implements OnInit {
  search:string='';
  save(event: any) {
    this.newSearch(event.target.value);
    var root=this;

      lastSearch=event.target.value;

      root.newSearch(event.target.value);

      if(event.target.value.length>=3){
      root.TvsService.getSearchTvs(event.target.value);
      root.tvsSub = root.TvsService
        .getPostUpdateListener()
        .subscribe((movies: TV[]) => {
          root.tvs = movies;


        });}

        else{
          root.TvsService.getMovies();
    root.tvsSub = root.TvsService
      .getPostUpdateListener()
      .subscribe((movies: TV[]) => {
        root.tvs = movies;
      });

        }


  }


  tvs: TV[] = [];
  searchTVs: string = '';
  private tvsSub: Subscription;

  constructor(private TvsService: TvsService,  private sharedService: SharedService) {}


  ngOnInit(): void {
    this.sharedService.lastSearch.subscribe(search => this.search = search);
    this.sharedService.lastSearch.subscribe(
      (res) => lastSearch=res,

    );

    this.searchTVs=lastSearch;
    if(lastSearch.length>=3){
      this.TvsService.getSearchTvs(lastSearch);
      this.tvsSub = this.TvsService
        .getPostUpdateListener()
        .subscribe((movies: TV[]) => {
          this.tvs = movies;


        });}

        else{
          this.TvsService.getMovies();
    this.tvsSub = this.TvsService
      .getPostUpdateListener()
      .subscribe((movies: TV[]) => {
        this.tvs = movies;


      });

        }
  }
  ngOnDestroy() {
    this.tvsSub.unsubscribe();
  }

  newSearch(search:string) {
    this.sharedService.nextMessage(search);
  }


}

