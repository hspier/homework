import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NETWORKS } from './networks.service';
import { FacebookService } from './facebook/facebook.service';
import { TwitterService } from './twitter/twitter.service';
import { LinkedInService } from './linkedin/linkedin.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: NETWORKS, useClass: FacebookService, multi: true},
    {provide: NETWORKS, useClass: LinkedInService, multi: true},
    {provide: NETWORKS, useClass: TwitterService, multi: true}
  ]
})
export class SocialModule { }
