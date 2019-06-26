import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StockAlgorithmData } from './../../../stock/stocks.service';

export const DEFAULT_ALGORITHM = 'default';

@Component({
  selector: 'app-default-algorithm',
  templateUrl: './default-algorithm.component.html',
  styleUrls: ['./default-algorithm.component.scss']
})
export class DefaultAlgorithmComponent implements OnInit {
  @Output() dataChange: EventEmitter<StockAlgorithmData> = new EventEmitter<StockAlgorithmData>();

  constructor() { }

  ngOnInit() {
    this.dataChange.emit({
      id: DEFAULT_ALGORITHM
    });
  }

}
