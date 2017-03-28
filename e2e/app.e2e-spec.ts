import { Testing2Page } from './app.po';

describe('testing2 App', () => {
  let page: Testing2Page;

  beforeEach(() => {
    page = new Testing2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
