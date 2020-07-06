import {
  Attribute,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef, HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {isDefined} from '../utils';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'ae-select',
  templateUrl: './ae-select.component.html',
  styleUrls: ['./ae-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AeSelectComponent),
      multi: true,
    }
  ]
})
export class AeSelectComponent implements OnInit, ControlValueAccessor {
  constructor (private elRef: ElementRef,
              private r: Renderer2,
  ) {}

  @Input() private options: SelectOption[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('hidden') private isHidden: boolean;

  private selectedOption: SelectOption;
  private disabled: boolean = false;
  private optionId: number = 0;

  get label (): string {
    return this.selectedOption && this.selectedOption.hasOwnProperty('label') ? this.selectedOption.label : 'Select';
  }

  private opened: boolean = false;

  get value (): string {
    return this.selectedOption.value;
  }

  @HostBinding('style.display') private hidden = 'inline-block';

  // tslint:disable-next-line:no-output-native no-output-rename
  @Output('change') protected changeEvent = new EventEmitter();

  @ViewChild('labelButton') private labelButton: ElementRef;

  public ngOnInit (): void {
    this.selectedOption = this.options[0];
    if (isDefined(this.isHidden) && this.isHidden) {
      this.hide();
    }
  }

  public hide (): void {
    this.hidden = 'none';
  }

  public optionSelect (option: SelectOption, event: MouseEvent): void {
    event.stopPropagation();
    this.setValue(option.value);
    this.onChange(this.selectedOption.value);
    this.changeEvent.emit(this.selectedOption.value);
    this.onTouched();
    this.opened = false;
  }

  public toggleOpen (event: MouseEvent): void {
    // event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.opened = !this.opened;
  }

  @HostListener('document:click', ['$event'])
  public onClick ($event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains($event.target)) {
      this.close();
    }
  }

  public close (): void {
    this.opened = false;
  }

  get isOpen (): boolean {
    return this.opened;
  }

  public writeValue (value): void {
    if (!value || typeof value !== 'string') {
      return;
    }
    this.setValue(value);
  }

  public setValue (value): void {
    let index = 0;
    const selectedEl = this.options.find((el, i) => {
      index = i;
      return el.value === value;
    });
    if (selectedEl) {
      this.selectedOption = selectedEl;
      this.optionId = index;
    }
  }

  public onChange (value: any): void {
  }

  public onTouched (): void {
  }

  public registerOnChange (fn): void {
    this.onChange = fn;
  }

  public registerOnTouched (fn): void {
    this.onTouched = fn;
  }

  public setDisabledState (isDisabled: boolean): void {
    this.labelButton.nativeElement.disabled = isDisabled;
    const div = this.labelButton.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.r[action](div, 'disabled');
    this.disabled = isDisabled;
  }

  @HostListener('keydown', ['$event'])
  public handleKeyDown ($event: KeyboardEvent): void {
    if (!this.opened) {
      return;
    }
    // console.log($event.key);
    // if (KeyCode[$event.key]) {
    switch ($event.key) {
      case 'ArrowDown':
        this.handleArrowDown($event);
        break;
      case 'ArrowUp':
        this.handleArrowUp($event);
        break;
      case 'Space':
        this.handleSpace($event);
        break;
      case 'Enter':
        this.handleEnter($event);
        break;
      case 'Tab':
        this.handleTab($event);
        break;
      case 'Escape':
        this.close();
        $event.preventDefault();
        break;
      case 'Backspace':
        this.handleBackspace();
        break;
    }
    // } else if ($event.key && $event.key.length === 1) {
    // this._keyPress$.next($event.key.toLocaleLowerCase());
    // }
  }

  public handleArrowDown ($event: any): void {
    if (this.optionId < this.options.length - 1) {
      this.optionId++;
    }
  }

  public handleArrowUp ($event: any): void {
    if (this.optionId >= 1) {
      this.optionId--;
    }
  }

  public handleSpace ($event: any): void {

  }

  public handleEnter ($event: any): void {
    this.optionSelect(this.options[this.optionId], $event);
  }

  public handleTab ($event: any): void {

  }

  public handleBackspace (): void {

  }
}
