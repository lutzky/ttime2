import { FromMinutesPipe } from './from-minutes.pipe';

describe('FromMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new FromMinutesPipe();
    expect(pipe).toBeTruthy();
  });
});
