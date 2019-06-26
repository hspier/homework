import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Recommendation, StockAlgorithmData } from './../../stock/stocks.service';
import { DEFAULT_ALGORITHM } from './default-algorithm/default-algorithm.component';

const RESULTS_PROPERTY = 'results';
const RATING_CLASS_BUY = 'rating--buy';
const RATING_CLASS_HOLD = 'rating--hold';
const RATING_CLASS_SELL = 'rating--sell';

export class StockResult {
  symbol: string;
  date: Date;
  rating: Recommendation;
}

class UIStockResult extends StockResult {
  ratingClass: string;
  ratingIcon: string;
  ratingText: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() results: StockResult[];
  @Output() algorithmChange: EventEmitter<StockAlgorithmData> = new EventEmitter<StockAlgorithmData>();

  stockResults: UIStockResult[];
  data: StockAlgorithmData;
  radioValue: string = DEFAULT_ALGORITHM;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[RESULTS_PROPERTY]) {
      this.updateResults();
    }
  }

  onAlgorithmDataChanged(data: StockAlgorithmData): void {
    this.algorithmChange.emit(data);
  }

  private updateResults(): void {
    if (this.results) {
      this.stockResults = this.results.map((currentResult: StockResult) => {
        return Object.assign({}, currentResult, {
          ratingIcon: this.getRatingIcon(currentResult),
          ratingClass: this.getRatingClass(currentResult),
          ratingText: this.getRatingText(currentResult)
        });
      });
    } else {
      this.stockResults = null;
    }
  }

  private getRatingClass(result: StockResult): string {
    let ratingClass: string;
    switch (result.rating) {
      case Recommendation.BUY:
        ratingClass = RATING_CLASS_BUY;
        break;
      case Recommendation.HOLD:
        ratingClass = RATING_CLASS_HOLD;
        break;
      case Recommendation.SELL:
        ratingClass = RATING_CLASS_SELL;
        break;
    }

    return ratingClass;
  }

  private getRatingText(result: StockResult): string {
    const name = Recommendation[result.rating];
    return `${name[0]}${name.substring(1).toLowerCase()}`;
  }

  private getRatingIcon(result: StockResult): string {
    return result.rating === Recommendation.HOLD ? 'll' : '$';
  }
}
