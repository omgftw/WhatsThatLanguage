import { Injectable, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Question } from '../model/question.class';
import { LANGUAGE_BLACKLIST } from '../model/language-blacklist.data';

import * as _ from 'lodash';

@Injectable()
export class GistService {
  http: Http;
  gists: Object[] = [];
  questions: Question[] = [];

  currentQuestion = new Subject<Question>();
  onQuestionChanged = this.currentQuestion.asObservable();

  currentGists = new Subject<Object[]>();
  onGistsChanged = this.currentGists.asObservable();

  constructor(http: Http) {
    this.http = http;
  }

  getGists() {
    this.http.get('https://api.github.com/gists/public?per_page=100')
      .map((response: Response) => response.json())
      .flatMap(data => {
        this.gists = data;
        this.createQuestions();
        return data;
      })
      .first()
      .subscribe((data: Object[]) => {
        this.currentGists.next(data);
      });

      return this.onGistsChanged;
  }

  private createQuestions() {
    _.forEach(this.gists, gist => {
      const question = new Question(this.http, gist);
      if (!_.includes(LANGUAGE_BLACKLIST, question.language)) {
        this.questions.push(question);
      }
    });
    _.shuffle(this.gists);
  }

  getNextQuestion() {
    this.currentQuestion.next(null);
    const question: Question = _.find(this.questions, { asked: false });
    question.asked = true;
    question.load();
    const loaded = question.onLoad().first();
    loaded.subscribe(x => {
      this.currentQuestion.next(question);
    });
    // return observable to allow subscribing via this function
    return loaded;
  }

}
