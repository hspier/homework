import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { StockSearchCriteria } from './../../content/form/form.component';
import { StocksService, StockPrice, StockRecommendation, StockSocialCount, StockAlgorithmData } from './../../stock/stocks.service';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { NetworksService, NetworkInformation } from './../../social/networks.service';
import { StockResult } from './../../content/results/results.component';
import { LoadingService } from './../../content/loading.service';
import { MockStocksService } from './../../stock/mock-stocks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{
    provide: StocksService,
    useClass: MockStocksService
  }]
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSymbol: string;
  prices: StockPrice[];
  networks: StockSocialCount[];
  results: StockResult[];
  algorithmData: StockAlgorithmData;
  medias: NetworkInformation[];

  private abortCurrent: Subject<void> = new Subject<void>();
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private stocksService: StocksService,
              private networksService: NetworksService,
              private loadingService: LoadingService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.abortCurrent.complete();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onCriteriaChanged(criteria: StockSearchCriteria): void {
    this.abortCurrent.next();
    this.currentSymbol = criteria.symbol;
    this.medias = this.networksService
      .list()
      .filter((currentNetwork: NetworkInformation) => currentNetwork.active);
    if (criteria.symbol) {
      this.loadingService.active.next(true);
      const counts = this.medias
        .map((currentNetwork: NetworkInformation) => {
          return this.stocksService.socialMediaCountGenerator(criteria.symbol, currentNetwork.id);
        });

      forkJoin(
        [this.stocksService.stockPriceGenerator(criteria.symbol, new Date(), criteria.period), ...counts]
      ).pipe(
        takeUntil(this.abortCurrent),
        takeUntil(this.unsubscribe)
      ).subscribe((results: any[]) => {
        this.prices = results[0];
        this.networks = results.slice(1);
        this.loadingService.active.next(false);
        this.updateResults();
        this.changeDetector.detectChanges();
      });
    } else {
      this.results = null;
    }
  }

  onAlgorithmChanged(algorithm: StockAlgorithmData): void {
    this.algorithmData = algorithm;
    this.updateResults();
    this.changeDetector.detectChanges();
  }

  private updateResults(): void {
    this.loadingService.active.next(true);
    this.stocksService.recommendationAlgorithm(this.prices, this.networks, this.algorithmData)
    .pipe(
      takeUntil(this.abortCurrent),
      takeUntil(this.unsubscribe))
    .subscribe((recommendations: StockRecommendation[]) => {
      this.loadingService.active.next(false);
      this.results = recommendations.map((currentRecommendation: StockRecommendation) => {
        return {
          symbol: this.currentSymbol,
          date: currentRecommendation.date,
          rating: currentRecommendation.rating
        };
      });
      this.changeDetector.detectChanges();
    });
  }

}
