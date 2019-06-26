import { Injectable } from '@angular/core';
import { NetworkService, NetworkInformation, NetworkPost } from '../networks.service';
import { Observable, of } from 'rxjs';

const FACEBOOK_ID = 'FACEBOOK';
const FACEBOOK_NAME = 'Facebook';

const BASE_TITLE = 'Facebook Title';
const BASE_DESCRIPTION = 'Description for post with title';

@Injectable()
export class FacebookService implements NetworkService {
  private information: NetworkInformation = {
    id: FACEBOOK_ID,
    name: FACEBOOK_NAME,
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
        logo: 'https://www.kotak.com/content/dam/Kotak/herosliderbanner/xcorporate-benifits-for-online-lead.jpg.pagespeed.ic.MQHvn9Ey3_.jpg'
      });
    }
    return of(posts);
  }
}
