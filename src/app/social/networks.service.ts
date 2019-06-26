import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

export const NETWORKS = new InjectionToken('SOCIAL_NETWORKS');

export interface NetworkInformation {
  id: string;
  name: string;
  logo: string;
  active: boolean;
  count?: number;
}

export interface NetworkPost {
  title: string;
  description: string;
  logo: string;
}

export interface NetworkService {
  isActive(): boolean;
  activate(): void;
  deactivate(): void;
  getInformation(): NetworkInformation;
  getPosts(count: number): Observable<NetworkPost[]>;
}

@Injectable({
  providedIn: 'root'
})
export class NetworksService {

  constructor(@Inject(NETWORKS) private networkServices: NetworkService[]) { }

  list(): NetworkInformation[] {
    return this.networkServices.map((service: NetworkService) => service.getInformation());
  }

  activate(id: string): void {
    const service = this.find(id);
    if (service) {
      service.activate();
    }
  }

  deactivate(id: string): void {
    const service = this.find(id);
    if (service) {
      service.deactivate();
    }
  }

  isActive(id: string): boolean {
    let active = false;
    const service = this.find(id);
    if (service) {
      active = service.isActive();
    }

    return active;
  }

  getPosts(id: string, count: number): Observable<NetworkPost[]> {
    let postsRequest = of([]);
    const service = this.find(id);
    if (service) {
      postsRequest = service.getPosts(count);
    }

    return postsRequest;
  }

  private find(id: string): NetworkService {
    return this.networkServices.find((service: NetworkService) => service.getInformation().id === id);
  }
}
