import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GistService } from '../services/gist.service';
import { Question } from '../model/question.class';
import { Observable } from 'rxjs/Rx';

import * as highlight from 'highlight.js';

@Component({
  selector: 'app-game-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, AfterViewChecked, OnChanges {
  @ViewChild('gameCodeContainer')
  gameCodeContainer: ElementRef;

  @Input()
  question: Question;

  gistService: GistService;
  gistsGotten: boolean = false;
  highlighted: boolean = false;
  showSpinner = false;

  constructor(gistService: GistService) {
    this.gistService = gistService;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question'].currentValue === null) {
      this.showSpinner = true;
    } else {
      this.showSpinner = false;
    }
    this.highlighted = false;
  }

  getCodeBlock() {
    return `
    <pre class="${this.question.language}"><code></code></pre>
    `;
  }

  highlightBlock(element: any) {
    highlight.highlightBlock(element);
    this.highlighted = true;
  }

  ngAfterViewChecked() {
    if (!this.highlighted && this.question && this.question.code !== '') {
      this.gameCodeContainer.nativeElement.innerHTML = this.getCodeBlock();
      this.gameCodeContainer.nativeElement.children[0].textContent = this.question.code;
      const element = this.gameCodeContainer.nativeElement.children[0];
      if (element) {
        // run the highlight functionality asynchronously
        Observable.create(observer => {
          return this.highlightBlock(element);
        }).subscribe();
      }
    }
  }

}
