import { WhatsThatLanguagePage } from './app.po';

describe('WhatsThatLanguage App', () => {
  let page: WhatsThatLanguagePage;

  beforeEach(() => {
    page = new WhatsThatLanguagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
