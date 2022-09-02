import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as React from 'react';
import {InputReactComponent} from '../react-comp/InputReactComponent';
import {createRoot, Root} from 'react-dom/client';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const containerElementName = 'inputReactComponentContainer';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputReactComponentReactiveFormWrapper),
  multi: true
};

@Component({
  selector: 'input-wrapper-reactive-component',
  template: `<span #${containerElementName}></span>`,
  // styleUrls: [''],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputReactComponentReactiveFormWrapper implements OnChanges, OnDestroy, AfterViewInit, ControlValueAccessor {
  @ViewChild(containerElementName, {static: true}) containerRef!: ElementRef;

  root: Root | undefined;

  constructor() {
    //this.handleChange = this.handleChange.bind(this);
this.registerOnChange(this.onChange)
  }

  onChange = (value:string) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  writeValue(innerValue: number) {
    console.log(innerValue)
    this.innerValue = innerValue;
    this.render();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)

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
    if (!this.root) {
      return;
    }
    const {innerValue} = this;
    console.log(this.innerValue)
    console.log(innerValue)
    this.root!.render(
      <React.StrictMode>
        <div>
          <InputReactComponent name={innerValue!} onChange={this.onChange}/>
        </div>
      </React.StrictMode>);
  }


  // ControlValueAccessor :

  private innerValue: any = ' ';
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }

}
