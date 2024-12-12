import { Component, OnInit } from '@angular/core';
import { BbcService } from './bbc.end.point.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgIf, NgForOf],
})
export class AppComponent implements OnInit {
  headlines: string[] = [];
  description: string[] = [];
  constructor(private bbcWebCrawlerService: BbcService) {}
  ngOnInit(): void {
    this.bbcWebCrawlerService?.fetchBbcHeadlines()?.subscribe({
      next: (data) => {
        this.headlines = data?.headlines;
        this.description = data?.description;
      },
      error: (error) => {
        console.error('Error fetching headlines:', error);
      },
    });
  }
}
