import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StockAlgorithmData } from './../../../stock/stocks.service';

const DEFAULT_RATIO = 10;
const DEBOUNCE_TIME = 500;
export const CUSTOM_ALGORITHM = 'custom';

export interface CustomStockAlgorithmData extends StockAlgorithmData {
  ratio: number;
}

@Component({
  selector: 'app-custom-algorithm',
  templateUrl: './custom-algorithm.component.html',
  styleUrls: ['./custom-algorithm.component.scss']
})
export class CustomAlgorithmComponent implements OnInit {
  @Output() dataChange: EventEmitter<CustomStockAlgorithmData> = new EventEmitter<CustomStockAlgorithmData>();

  ratio = DEFAULT_RATIO;
  timer: any;

  constructor() { }

  ngOnInit() {
    this.dataChange.emit({
      ratio: this.ratio,
      id: CUSTOM_ALGORITHM
    });
  }

  onRatioChanged(ratio: number): void {
    this.ratio = ratio;
    this.clearTimeout();
    this.timer = setTimeout(() => {
      this.dataChange.emit({
        ratio: this.ratio,
        id: CUSTOM_ALGORITHM
      });
    }, DEBOUNCE_TIME);
  }

  private clearTimeout(): void {
    clearTimeout(this.timer);
  }

}
