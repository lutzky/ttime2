import { Ttime2Page } from './app.po';

describe('ttime2 App', () => {
  let page: Ttime2Page;

  beforeEach(() => {
    page = new Ttime2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
