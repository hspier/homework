import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { NetworksService, NetworkInformation } from './../../social/networks.service';
import { StockSocialCount } from './../../stock/stocks.service';

const MIN_PERIOD = 1;
const MAX_PERIOD = 999;
const DEFAULT_TIMEPERIOD = 10;
const DEBOUNCE_TIME = 1000;

export interface StockSearchCriteria {
  symbol: string;
  period: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() networks: StockSocialCount[];
  @Output() criteriaChange: EventEmitter<StockSearchCriteria> = new EventEmitter<StockSearchCriteria>();

  symbol: string;
  timePeriod = DEFAULT_TIMEPERIOD;
  networksInformation: NetworkInformation[];

  timer: any;

  constructor(private networksService: NetworksService) { }

  ngOnInit() {
    this.networksInformation = this.networksService.list();
    this.updateCounts();
  }

  ngOnChanges(): void {
    this.updateCounts();
  }

  onSymbolEnterPressed(): void {
    this.clearTimeout();
    this.notifyChange(this.symbol);
  }

  onSymbolModelChanged(symbol: string): void {
    this.symbol = symbol;
    this.clearTimeout();
    this.timer = setTimeout(() => {
      this.notifyChange(symbol);
    }, DEBOUNCE_TIME);
  }

  onTimePeriodModelChanged(timePeriod: number): void {
    if (timePeriod < MIN_PERIOD) {
      timePeriod = MIN_PERIOD;
    } else if (timePeriod > MAX_PERIOD) {
      timePeriod = MAX_PERIOD;
    }
    this.timePeriod = timePeriod;
    this.notifyChange(this.symbol);
  }

  onMediaClicked(media: NetworkInformation): void {
    if (media.active) {
      this.networksService.deactivate(media.id);
      media.count = null;
    } else {
      this.networksService.activate(media.id);
    }
    this.notifyChange(this.symbol);
  }

  private clearTimeout(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private notifyChange(symbol: string): void {
    this.criteriaChange.emit({
      symbol,
      period: this.timePeriod
    });
  }

  private updateCounts(): void {
    if (this.networksInformation) {
      this.networksInformation.forEach((currentInformation: NetworkInformation) => currentInformation.count = null);
      if (this.networks) {
        this.networks.forEach((currentCount: StockSocialCount) => {
          const network = this.networksInformation
            .find((currentInformation: NetworkInformation) => currentInformation.id === currentCount.network);
          if (network) {
            network.count = currentCount.count;
          }
        });
      }
    }
  }

}
