import { Component, OnInit, Input } from '@angular/core';
import { NetworkInformation } from './../../social/networks.service';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})
export class MediasComponent implements OnInit {
  @Input() medias: NetworkInformation[];

  constructor() { }

  ngOnInit() {
  }

}
