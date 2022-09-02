import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-react-poc-app';

  public counter = 21;
  name: string = "John";

  public firstControl: FormControl | undefined;
  public secondControl: FormControl | undefined;
  public form: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {
  }

  public handleOnClick(stateCounter: number) {
    this.counter++;
  }

  setValue() {
    this.name = "Peter";
  }

  ngOnInit(): void {
    this.firstControl = new FormControl("");
    this.secondControl = new FormControl("");
    this.firstControl.valueChanges.subscribe((v)=>{
      this.secondControl?.setValue(v.toUpperCase());
      if(v.length > 5) {
        this.secondControl?.disable();
      } else {
        this.secondControl?.enable();
      }
    })
    this.form = this.formBuilder.group({
      first: this.firstControl,
      second: this.secondControl,
    });
  }
}
