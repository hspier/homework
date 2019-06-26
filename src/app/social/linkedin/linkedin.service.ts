import { Injectable } from '@angular/core';
import { NetworkService, NetworkInformation, NetworkPost } from '../networks.service';
import { Observable, of } from 'rxjs';

const LINKEDIN_ID = 'LINKEDIN';
const LINKEDIN_NAME = 'LinkedIn';

const BASE_TITLE = 'LinkedIn Title';
const BASE_DESCRIPTION = 'Description for post with title';

@Injectable()
export class LinkedInService implements NetworkService {
  private information: NetworkInformation = {
    id: LINKEDIN_ID,
    name: LINKEDIN_NAME,
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
        logo: 'https://assets.kpmg/content/dam/kpmg/images/' +
          '2016/07/za-regulatory-governance-thumbnail.jpg/jcr:content/renditions/cq5dam.web.512.341.jpg'
      });
    }
    return of(posts);
  }
}
