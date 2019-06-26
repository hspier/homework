import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ResultsComponent } from './results/results.component';
import { MediasComponent } from './medias/medias.component';
import { LoadingComponent } from './loading/loading.component';
import { MediaComponent } from './media/media.component';
import { CustomAlgorithmComponent } from './results/custom-algorithm/custom-algorithm.component';
import { DefaultAlgorithmComponent } from './results/default-algorithm/default-algorithm.component';

@NgModule({
  declarations: [FormComponent, ResultsComponent, MediasComponent, LoadingComponent,
    MediaComponent, CustomAlgorithmComponent, DefaultAlgorithmComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormComponent, ResultsComponent, MediasComponent, LoadingComponent, MediaComponent
  ]
})
export class ContentModule { }
