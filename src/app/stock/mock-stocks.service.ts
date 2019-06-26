import { Injectable } from '@angular/core';
import { StocksService, StockPrice, StockSocialCount, StockRecommendation, StockAlgorithmData } from './stocks.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockStocksService extends StocksService {

  constructor() {
    super();
   }

  stockPriceGenerator(symbol: string, from: Date, period: number): Observable<StockPrice[]> {
    const dates = [];
    for (let index = 0; index < period; index++) {
      const date = new Date(from);
      date.setDate(date.getDate() - index);
      dates.push(date);
    }
    return of(dates.map((currentDate: Date) => {
      return {
        symbol,
        date: currentDate,
        price: `${(Math.random() * 1000).toFixed(2)}$`
      };
    })).pipe(delay((Math.random() * 100000) % 500));
  }

  socialMediaCountGenerator(symbol: string, networkId: string): Observable<StockSocialCount> {
    return of({
      symbol,
      network: networkId,
      count: Math.floor((Math.random() * 100000) % 100)
    }).pipe(delay((Math.random() * 100000) % 500));
  }

  recommendationAlgorithm(
    prices: StockPrice[],
    networksCount: StockSocialCount[],
    data?: StockAlgorithmData): Observable<StockRecommendation[]> {
    return of(prices.map((currentPrice: StockPrice) => {
      return {
        date: currentPrice.date,
        rating: Math.floor((Math.random() * 100000) % 3)
      };
    })).pipe(delay((Math.random() * 100000) % 500));
  }
}
