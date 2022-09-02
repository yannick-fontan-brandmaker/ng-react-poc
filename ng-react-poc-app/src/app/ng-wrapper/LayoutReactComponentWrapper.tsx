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
import { LayoutReactComponent } from '../react-comp/LayoutReactComponent';
import {createRoot, Root} from 'react-dom/client';


@Component({
  selector: 'layout-wrapper-component',
  template: `<div>
    <div style="display: none">
      <ng-content></ng-content>
    </div><span #customReactComponentContainer></span>
  </div>`,
  // styleUrls: [''],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutReactComponentWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('customReactComponentContainer', { static: true }) containerRef!: ElementRef;
  @ViewChild('content', { static: true })contentRef!: ElementRef;
  root: Root | undefined;

  public content: string | undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.content = this.elementRef.nativeElement.innerHTML;
    this.root = createRoot(this.containerRef.nativeElement);
    this.render();
  }

  ngOnDestroy() {
    this.root?.unmount();
  }

  private render() {
    if(!this.root ) {
      return;
    }
    this.root!.render(
      <React.StrictMode>
        <div>
          <LayoutReactComponent>{this.content}</LayoutReactComponent>
        </div>
      </React.StrictMode>);
  }

}
/*

  private render() {
    ReactDOM.render(
      React.createElement('div', {
        children: React.createElement('div', {className: "blue" }),
        className: "red",
      }),
      this.containerRef.nativeElement);
  }

  <React.StrictMode>
        <div>
          <LayoutReactComponent>
            {this.props.children}
          </LayoutReactComponent>
        </div>
      </React.StrictMode>
      ,
 */

/*

import htmlToReact from 'html-to-react';
...
mount() {
   const props = {
      ...this.getProps(this.attributes, MyReactComponent.propTypes)
      ...this.getEvents(MyReactComponent.propTypes),
      children: this.parseHtmlToReact(this.innerHTML)
   };
   ReactDOM.render(<MyReactComponent {...props} />, this);
}
parseHtmlToReact(html) {
   return html && new htmlToReact.Parser().parse(html);
}
The custom element is now able to render nested elements. However, as soon as the element gets updated, they disappear. Why? It’s because the content of this.innerHTML is gone after the element is mounted. To overcome this, let’s cache the initial content during connectedCallback and use the variable inside mount:

connectedCallback() {
   this._innerHTML = this.innerHTML;
   this.mount();
}

 */
