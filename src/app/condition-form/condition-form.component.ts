import {
  Component,
  OnDestroy,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  FormArray,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ConditionFormComponentData {
  id: any;
  values: any;
}

@Component({
  selector: 'app-condition-form',
  templateUrl: './condition-form.component.html',
  styleUrls: ['./condition-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConditionFormComponent),
      multi: true,
    },
  ],
})
export class ConditionFormComponent
  implements ControlValueAccessor, OnDestroy, OnInit
{
  @Input()
  formLabel: string | number = 'Label';
  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  addCondition: EventEmitter<void> = new EventEmitter<void>();
  _addCondition() {
    this._conditionsFormArray.push(this._fb.control({ id: 0, values: null }));
  }
  get _conditionsFormArray(): FormArray {
    return this._form.get('controlValues') as FormArray;
  }

  get _groupsFormArray(): FormArray {
    return this._form.get('templateControls') as FormArray;
  }
  _form: FormGroup = this._fb.group({
    controlId: null,
    label: null,
    controlValues: this._fb.array([]),
    templateControls: this._fb.array([]),
  });

  private _onChange!: (
    value: ConditionFormComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder) {}
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this._createFormGroup();

    this._setupObservables();
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  writeValue(value: ConditionFormComponentData): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }
  registerOnChange(
    fn: (v: ConditionFormComponentData | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      id: 0,
      values: null,
    });
  }

  private _setupObservables() {
    this._form.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) => {
        if (this._onChange) {
          this._onChange(value);
        }
      });
  }
}
