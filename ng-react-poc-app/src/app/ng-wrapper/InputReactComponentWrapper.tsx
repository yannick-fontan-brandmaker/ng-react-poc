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
  useExisting: forwardRef(() => InputReactComponentWrapperComponent),
  multi: true
};

@Component({
  selector: 'input-wrapper-component',
  template: `<span #${containerElementName}></span>`,
  // styleUrls: [''],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputReactComponentWrapperComponent implements OnChanges, OnDestroy, AfterViewInit, ControlValueAccessor {
  @ViewChild(containerElementName, {static: true}) containerRef!: ElementRef;

  @Input() public ngModel: string | undefined;
  @Output() public ngModelChange = new EventEmitter<void>();

  root: Root | undefined;

  constructor() {
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange(event: any) {
    if (this.ngModelChange) {
      this.ngModelChange.emit(event);
      this.render();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.ngModel)
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
    const {ngModel} = this;
    console.log(this.ngModel)
    console.log(ngModel)
    this.root!.render(
      <React.StrictMode>
        <div>
          <InputReactComponent name={ngModel!} onChange={this.handleChange}/>
        </div>
      </React.StrictMode>);
  }


  // ControlValueAccessor :

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  onBlur() {
    this.onTouchedCallback();
  }

}
