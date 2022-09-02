import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as React from 'react';
import {CustomReactComponent} from '../react-comp/CustomReactComponent';
import {createRoot, Root} from 'react-dom/client';

const containerElementName = 'customReactComponentContainer';

@Component({
  selector: 'custom-wrapper-component',
  template: `<span #${containerElementName}></span>`,
  // styleUrls: [''],
  encapsulation: ViewEncapsulation.None,
})
export class CustomReactComponentWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, {static: true}) containerRef!: ElementRef;

  @Input() public counter = 10;
  @Output() public componentClick = new EventEmitter<void>();

  root: Root | undefined;

  constructor() {
    this.handleDivClicked = this.handleDivClicked.bind(this);
  }

  public handleDivClicked() {
    if (this.componentClick) {
      this.componentClick.emit();
      this.render();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.render();
  }

  ngOnDestroy() {
    this.root?.unmount();
  }

  private render() {
    if(!this.root) {
      return;
    }
    const {counter} = this;
    this.root!.render(
      <React.StrictMode>
        <div>
          <CustomReactComponent counter={counter} onClick={this.handleDivClicked}/>
        </div>
      </React.StrictMode>);
  }
}
