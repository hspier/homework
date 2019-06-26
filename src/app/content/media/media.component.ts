import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { NetworksService, NetworkInformation, NetworkPost } from './../../social/networks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DEFAULT_COUNT = 2;

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnChanges, OnDestroy {
  @Input() network: NetworkInformation;

  posts: NetworkPost[];

  count = DEFAULT_COUNT;
  options = [DEFAULT_COUNT, 5, 10];

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private networksService: NetworksService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.loadPosts();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onPostsCountChanged(count: number): void {
    this.count = count;
    this.loadPosts();
  }

  private loadPosts(): void {
    if (this.network) {
      this.networksService.getPosts(this.network.id, this.count)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((posts: NetworkPost[]) => this.posts = posts);
    }
  }
}
