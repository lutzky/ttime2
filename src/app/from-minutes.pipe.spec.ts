import { FromMinutesPipe } from './from-minutes.pipe';

describe('FromMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new FromMinutesPipe();
    expect(pipe).toBeTruthy();
  });
  it('correctly formats a few numbers', () => {
    const pipe = new FromMinutesPipe();
    expect(pipe.transform(30)).toEqual("00:30");
    expect(pipe.transform(90)).toEqual("01:30");
    expect(pipe.transform(610)).toEqual("10:10");
    expect(pipe.transform(1220)).toEqual("20:20");
  });
});
