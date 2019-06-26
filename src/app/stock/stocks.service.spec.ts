import { TestBed } from '@angular/core/testing';

import { StocksService, StockPrice, StockSocialCount, StockRecommendation, Recommendation } from './stocks.service';
import { MockStocksService } from './mock-stocks.service';

describe('StocksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: StocksService, useClass: MockStocksService}
    ]
  }));

  it('should be created', () => {
    const service: StocksService = TestBed.get(StocksService);
    expect(service).toBeTruthy();
  });

  it('should provide stock prices for given period', (done) => {
    const service: StocksService = TestBed.get(StocksService);
    service.stockPriceGenerator('TEST', new Date(), 10).subscribe((prices: StockPrice[]) => {
      expect(prices[0].symbol).toBe('TEST');
      expect(prices[0].price).not.toBeNaN();
      expect(prices.length).toBe(10);
      done();
    });
  });

  it('should provide social network posts for given stock symbol', (done) => {
    const service: StocksService = TestBed.get(StocksService);
    service.socialMediaCountGenerator('TEST', 'FACEBOOK').subscribe((count: StockSocialCount) => {
      expect(count.symbol).toBe('TEST');
      expect(count.network).toBe('FACEBOOK');
      expect(count.count).not.toBeNaN();
      done();
    });
  });

  it('should provide recommendations based on stock prices and social network posts count', (done) => {
    const service: StocksService = TestBed.get(StocksService);

    const date = new Date();

    const prices: StockPrice[] = [{
      symbol: 'TEST',
      date,
      price: '100'
    }];

    const counts: StockSocialCount[] = [{
      symbol: 'TEST',
      network: 'FACEBOOK',
      count: 100
    }];

    service.recommendationAlgorithm(prices, counts).subscribe((recommendations: StockRecommendation[]) => {
      expect(recommendations[0].date).toEqual(date);
      expect(recommendations[0].rating === Recommendation.BUY ||
        recommendations[0].rating === Recommendation.HOLD ||
        recommendations[0].rating === Recommendation.SELL).toBeTruthy();
      done();
    });
  });
});
