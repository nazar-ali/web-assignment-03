import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as cheerio from 'cheerio';

@Injectable({
  providedIn: 'root',
})
export class BbcService {
  constructor(private http: HttpClient) {}

  fetchBbcHeadlines(): Observable<any> {
    const bbcUrl = 'https://bbc.com';

    return this.http.get(bbcUrl, { responseType: 'text' }).pipe(
      map((html: string) => {
        const $ = cheerio.load(html);
        const headlines: { headline: string; description: string }[] = [];

        $('.media__content').each((index, element) => {
          const headline = $(element).find('.media__title a').text().trim();
          const description = $(element).find('.media__summary').text().trim();

          if (headline && description) {
            headlines.push({ headline, description });
          }
        });
        return headlines;
      })
    );
  }
}
