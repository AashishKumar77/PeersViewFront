import {Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {AngularEditorService} from './angular-editor.service';
import {HttpResponse} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {CustomClass} from './config';
import {SelectOption} from './ae-select/ae-select.component';

@Component({
  selector: 'angular-editor-toolbar',
  templateUrl: './angular-editor-toolbar.component.html',
  styleUrls: ['./angular-editor-toolbar.component.scss']
})

export class AngularEditorToolbarComponent {
  constructor (
    private r: Renderer2,
    private editorService: AngularEditorService,
    @Inject(DOCUMENT) private doc: any
  ) {
  }

  private htmlMode = false;
  private linkSelected = false;
  private block = 'default';
  private fontName = 'Times New Roman';
  private fontSize = '3';
  private foreColour;
  private backColor;

  private headings: SelectOption[] = [
    {
      label: 'Heading 1',
      value: 'h1',
    },
    {
      label: 'Heading 2',
      value: 'h2',
    },
    {
      label: 'Heading 3',
      value: 'h3',
    },
    {
      label: 'Heading 4',
      value: 'h4',
    },
    {
      label: 'Heading 5',
      value: 'h5',
    },
    {
      label: 'Heading 6',
      value: 'h6',
    },
    {
      label: 'Heading 7',
      value: 'h7',
    },
    {
      label: 'Paragraph',
      value: 'p',
    },
    {
      label: 'Predefined',
      value: 'pre'
    },
    {
      label: 'Standard',
      value: 'div'
    },
    {
      label: 'default',
      value: 'default'
    }
  ];

  private fontSizes: SelectOption[] = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    }
  ];

  private customClassId = '-1';
  // tslint:disable-next-line:variable-name
  private _customClasses: CustomClass[];
  private customClassList: SelectOption[] = [{label: '', value: ''}];
  // uploadUrl: string;

  private tagMap = {
    BLOCKQUOTE: 'indent',
    A: 'link'
  };

  private select = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'PRE', 'DIV'];

  private buttons = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter',
    'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'link'];

  @Input() private id: string;
  @Input() private uploadUrl: string;
  @Input() private showToolbar: boolean;
  @Input() private fonts: SelectOption[] = [{label: '', value: ''}];

  @Input()
  set customClasses (classes: CustomClass[]) {
    if (classes) {
      this._customClasses = classes;
      this.customClassList = this._customClasses.map((x, i) => ({label: x.name, value: i.toString()}));
      this.customClassList.unshift({label: 'Clear Class', value: '-1'});
    }
  }

  @Input()
  set defaultFontName (value: string) {
    if (value) {
      this.fontName = value;
    }
  }

  @Input()
  set defaultFontSize (value: string) {
    if (value) {
      this.fontSize = value;
    }
  }

  @Input() private hiddenButtons: string[][];

  @Output() private execute: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('fileInput') private myInputFile: ElementRef;

  public get isLinkButtonDisabled (): boolean {
    return this.htmlMode || !Boolean(this.editorService.selectedText);
  }

  /**
   * Trigger command from editor header buttons
   * @param command string from toolbar buttons
   */
  public triggerCommand (command: string): void {
    this.execute.emit(command);
  }

  /**
   * highlight editor buttons when cursor moved or positioning
   */
  public triggerButtons (): void {
    if (!this.showToolbar) {
      return;
    }
    this.buttons.forEach(e => {
      const result = this.doc.queryCommandState(e);
      const elementById = this.doc.getElementById(e + '-' + this.id);
      if (result) {
        this.r.addClass(elementById, 'active');
      } else {
        this.r.removeClass(elementById, 'active');
      }
    });
  }

  /**
   * trigger highlight editor buttons when cursor moved or positioning in block
   */
  public triggerBlocks (nodes: Node[]): void {
    if (!this.showToolbar) {
      return;
    }
    this.linkSelected = nodes.findIndex(x => x.nodeName === 'A') > -1;
    let found = false;
    this.select.forEach(y => {
      const node = nodes.find(x => x.nodeName === y);
      if (node !== undefined && y === node.nodeName) {
        if (found === false) {
          this.block = node.nodeName.toLowerCase();
          found = true;
        }
      } else if (found === false) {
        this.block = 'default';
      }
    });

    found = false;
    if (this._customClasses) {
      this._customClasses.forEach((y, index) => {
        const node = nodes.find((x: any) => {
          if (x instanceof Element) {
            return x.className === y.class;
          }
          return null;
        });
        if (node) {
          if (found === false) {
            this.customClassId = index.toString();
            found = true;
          }
        } else if (found === false) {
          this.customClassId = '-1';
        }
      });
    }

    Object.keys(this.tagMap).map(e => {
      const elementById = this.doc.getElementById(this.tagMap[e] + '-' + this.id);
      const node = nodes.find(x => x.nodeName === e);
      if (node !== undefined && e === node.nodeName) {
        this.r.addClass(elementById, 'active');
      } else {
        this.r.removeClass(elementById, 'active');
      }
    });

    this.foreColour = this.doc.queryCommandValue('ForeColor');
    this.fontSize = this.doc.queryCommandValue('FontSize');
    this.fontName = this.doc.queryCommandValue('FontName').replace(/"/g, '');
    this.backColor = this.doc.queryCommandValue('backColor');
  }

  /**
   * insert URL link
   */
  public insertUrl (): void {
    let url = 'https:\/\/';
    const selection = this.editorService.savedSelection;
    if (selection && selection.commonAncestorContainer.parentElement.nodeName === 'A') {
      const parent = selection.commonAncestorContainer.parentElement as HTMLAnchorElement;
      if (parent.href !== '') {
        url = parent.href;
      }
    }
    url = prompt('Insert URL link', url);
    if (url && url !== '' && url !== 'https://') {
      this.editorService.createLink(url);
    }
  }

  /**
   * insert Video link
   */
  public insertVideo (): void {
    this.execute.emit('');
    const url = prompt('Insert Video link', `https://`);
    if (url && url !== '' && url !== `https://`) {
      this.editorService.insertVideo(url);
    }
  }

  /** insert color */
  public insertColor (color: string, where: string): void {
    this.editorService.insertColor(color, where);
    this.execute.emit('');
  }

  /**
   * set font Name/family
   * @param foreColor string
   */
  public setFontName (foreColor: string): void {
    this.editorService.setFontName(foreColor);
    this.execute.emit('');
  }

  /**
   * set font Size
   * @param fontSize string
   */
  public setFontSize (fontSize: string): void {
    this.editorService.setFontSize(fontSize);
    this.execute.emit('');
  }

  /**
   * toggle editor mode (WYSIWYG or SOURCE)
   * @param m boolean
   */
  public setEditorMode (m: boolean): void {
    const toggleEditorModeButton = this.doc.getElementById('toggleEditorMode' + '-' + this.id);
    if (m) {
      this.r.addClass(toggleEditorModeButton, 'active');
    } else {
      this.r.removeClass(toggleEditorModeButton, 'active');
    }
    this.htmlMode = m;
  }

  /**
   * Upload image when file is selected
   */
  public onFileChanged (event): void {
    const file = event.target.files[0];
    if (file.type.includes('image/')) {
        if (this.uploadUrl) {
            this.editorService.uploadImage(file).subscribe(e => {
              if (e instanceof HttpResponse) {
                this.editorService.insertImage(e.body.imageUrl);
                this.fileReset();
              }
            });
        } else {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent) => {
            const fr = e.currentTarget as FileReader;
            this.editorService.insertImage(fr.result.toString());
          };
          reader.readAsDataURL(file);
        }
      }
  }

  /**
   * Reset Input
   */
  public fileReset (): void {
    this.myInputFile.nativeElement.value = '';
  }

  /**
   * Set custom class
   */
  public setCustomClass (classId: string): void {
    if (classId === '-1') {
      this.execute.emit('clear');
    } else {
      this.editorService.createCustomClass(this._customClasses[+classId]);
    }
  }

  public isButtonHidden (name: string): boolean {
    if (!name) {
      return false;
    }
    if (!(this.hiddenButtons instanceof Array)) {
      return false;
    }
    let result: any;
    for (const arr of this.hiddenButtons) {
      if (arr instanceof Array) {
        result = arr.find(item => item === name);
      }
      if (result) {
        break;
      }
    }
    return result !== undefined;
  }
}
