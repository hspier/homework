import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { ContentModule } from './content/content.module';
import { AppRoutingModule } from './app-routing.module';
import { PageModule } from './page/page.module';
import { SocialModule } from './social/social.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    ContentModule,
    PageModule,
    AppRoutingModule,
    SocialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
