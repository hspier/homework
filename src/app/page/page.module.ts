import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContentModule } from '../content/content.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ContentModule
  ]
})
export class PageModule { }
