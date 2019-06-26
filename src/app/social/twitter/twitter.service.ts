import { Injectable } from '@angular/core';
import { NetworkService, NetworkInformation, NetworkPost } from '../networks.service';
import { Observable, of } from 'rxjs';

const TWITTER_ID = 'TWITTER';
const TWITTER_NAME = 'Twitter';

const BASE_TITLE = 'Twitter Title';
const BASE_DESCRIPTION = 'Description for post with title';

@Injectable()
export class TwitterService implements NetworkService {
  private information: NetworkInformation = {
    id: TWITTER_ID,
    name: TWITTER_NAME,
    logo: null,
    active: true
  };

  constructor() { }

  activate(): void {
    this.information.active = true;
  }

  deactivate(): void {
    this.information.active = false;
  }

  isActive(): boolean {
    return this.information.active;
  }

  getInformation(): NetworkInformation {
    return this.information;
  }

  getPosts(count: number): Observable<NetworkPost[]> {
    const posts = [];
    for (let index = 0; index < count; index++) {
      posts.push({
        title: `${BASE_TITLE} ${index + 1}`,
        description: `${BASE_DESCRIPTION} ${index + 1}`,
        logo: 'https://www.aaoms.org/images/uploads/slider/xcorporate-support-slider-img.jpg.pagespeed.ic.2MN41DpO1E.jpg'
      });
    }
    return of(posts);
  }
}
