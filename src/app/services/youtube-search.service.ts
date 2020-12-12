import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';


import { SearchResult } from '../search-result/search-result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const YOUTUBE_API_KEY =
  'AIzaSyCc_3uQKkoaYy4tIR5CbH6K5FcSvw2FZck';
export const YOUTUBE_API_URL =
  'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class YouTubeSearchService {
  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) {}

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl).pipe(map(response => {
      return <any>response['items'].map(item => {
        // console.log("raw item", item); // uklonite komentar za debug
        return new SearchResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description
        });
      });
    }));
  }
}
