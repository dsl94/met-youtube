import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HttpClientModule } from '@angular/common/http';
import { YouTubeSearchService } from './services/youtube-search.service';
import { YoutubesearchComponent } from './youtubesearch/youtubesearch.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    YoutubesearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [YouTubeSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
