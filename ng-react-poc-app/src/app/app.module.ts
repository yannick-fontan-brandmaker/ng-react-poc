import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CustomReactComponentWrapperComponent} from "./ng-wrapper/CustomReactComponentWrapper";
import {LayoutReactComponentWrapperComponent} from "./ng-wrapper/LayoutReactComponentWrapper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputReactComponentWrapperComponent} from "./ng-wrapper/InputReactComponentWrapper";
import {
  InputReactComponentReactiveFormWrapper
} from "./ng-wrapper/InputReactComponentReactiveFormWrapper";

@NgModule({
  declarations: [
    AppComponent,
    CustomReactComponentWrapperComponent,
    LayoutReactComponentWrapperComponent,
    InputReactComponentWrapperComponent,
    InputReactComponentReactiveFormWrapper
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
