import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface StockPrice {
  symbol: string;
  date: Date;
  price: string;
}

export interface StockSocialCount {
  symbol: string;
  network: string;
  count: number;
}

export enum Recommendation {
  BUY,
  SELL,
  HOLD
}

export interface StockRecommendation {
  date: Date;
  rating: Recommendation;
}

export interface StockAlgorithmData {
  id: string;
}

@Injectable()
export class StocksService {

  constructor() { }

  stockPriceGenerator(symbol: string, from: Date, period: number): Observable<StockPrice[]> {
    return of([]);
  }

  socialMediaCountGenerator(symbol: string, networkId: string): Observable<StockSocialCount> {
    return of(null);
  }

  recommendationAlgorithm(
    prices: StockPrice[],
    networksCount: StockSocialCount[],
    data?: StockAlgorithmData): Observable<StockRecommendation[]> {
    return of([]);
  }
}
