import { TestBed } from '@angular/core/testing';

import { YoutubeSearchService } from './youtube-search.service';

describe('YoutubeSearchService', () => {
  let service: YoutubeSearchService;

  beforeEach(() => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          BaseRequestOptions,
          MockBackend,
          YoutubeSearchService,
          { provide: Http,
            useFactory: (backend: ConnectionBackend,
                         defaultOptions: BaseRequestOptions) => {
                           return new Http(backend, defaultOptions);
                         }, deps: [MockBackend, BaseRequestOptions] },
        ]
      });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should should search', () => {
    inject([YoutubeSearchService, MockBackend], fakeAsync((svc, backend) => {
      let res;
      expectURL(backend, 'https://www.googleapis.com/youtube/v3/search');
      svc.getBody('title').subscribe((_res) => {
        res = _res;
      });
      tick();
  });

  function expectURL(backend: MockBackend, url: string) {
    backend.connections.subscribe(c => {
      expect(c.request.url).toBe(url);
      const response = new ResponseOptions({body: '{"title": "Drzavni posao 222"}'});
      c.mockRespond(new Response(response));
    });
  }
});
