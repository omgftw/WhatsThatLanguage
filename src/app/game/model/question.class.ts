import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GistService } from '../services/gist.service';
import { Observable } from 'rxjs/Rx';

export class Question {
    private http: Http;
    private gist: any;
    private codeUrl: string;
    public code: string;
    public language: string;
    public asked: boolean = false;
    private toLoad: Observable<any>[] = [];

    constructor(
        http: Http,
        gist: Object
    ) {
        this.http = http;
        this.gist = gist;
        this.populateData();
    }

    // bundles all observables involved in loading the question into a single observable
    onLoad() {
        return Observable.forkJoin(this.toLoad);
    }

    load() {
        this.toLoad.push(this.getCode(this.codeUrl));
        return this.onLoad();
    }

    getCode(codeUrl: string) {
        const observable = this.http.get(codeUrl)
            .map((response: Response) => response.text()).share();
        observable.subscribe(data => {
            this.code = data;
        });
        return observable;
    }

    // traverse the gist and grab relevant data
    populateData() {
        const files = this.gist.files;
        const keys = Object.keys(files);
        // get the first file's raw_url
        const firstFile = files[keys[0]];
        this.codeUrl = firstFile.raw_url;

        this.language = firstFile.language;
    }
}
