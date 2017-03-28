import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { GistService } from './services/gist.service';
import { Question } from './model/question.class';
import { Observable } from 'rxjs/Rx';
import { LANGUAGES } from './model/languages.data';

import * as highlight from 'highlight.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('gameCodeContainer') gameCodeContainer: ElementRef;
  gistService: GistService;
  snackbar: MdSnackBar;
  question: Question;
  gistsGotten: boolean = false;
  highlighted: boolean = false;
  answers: string[];
  answersCorrect: number = 0;
  answersIncorrect: number = 0;
  // the total number of answers to be shown to the user (including the correct one)
  private _totalAnswers: number = 4;

  constructor(gistService: GistService, snackbar: MdSnackBar) {
    this.gistService = gistService;
    this.snackbar = snackbar;
  }

  ngOnInit() {
    this.gistService.onQuestionChanged.subscribe(question => {
      this.question = question;
    });
    this.gistService.getGists().subscribe(x => {
      this.gistsGotten = true;
      this.gistService.getNextQuestion().first().subscribe(y => {
        this.getAnswers();
      });
    });
  }

  getAnswers() {
    this.answers = [];
    const tempQuestions: string[] = _.cloneDeep(LANGUAGES);
    this.answers.push(this.question.language);
    // remove the current question's language from tempQuestion to prevent duplicates
    _.remove(tempQuestions, x => { return x === this.question.language; });
    _.times(this._totalAnswers - 1, x => {
      // get a random language
      const index = _.random(0, tempQuestions.length - 1);
      // add that item's language to 'answers'
      this.answers.push(tempQuestions[index]);
      // remove the item from the temp array
      tempQuestions.splice(index, 1);
    });
    // shuffle the array
    this.answers = _.shuffle(this.answers);
  }

  selectAnswer(selectedAnswer: string) {
    if (selectedAnswer === 'skip') {
      // Do nothing
    } else if (selectedAnswer === this.question.language) {
      this.answersCorrect++;
      this.snackbar.open(`Correct!`, null, {
        duration: 1000
      });
    } else {
      this.answersIncorrect++;
      this.snackbar.open(`
        Incorrect!
        The correct answers was ${this.question.language}
        `,
        'Dismiss', {
          duration: 10000
        });
    }
    this.gistService.getNextQuestion().first().subscribe(x => {
      this.getAnswers();
    });
  }
}
