import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/dateGenerator';

describe('Date Generator should', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('be able to generate date in ISO format', () => {
    const fixedTimestamp = 1713256115000;
    jest.setSystemTime(fixedTimestamp);
    const dateGenerator = new DateGenerator();
    const expectedGeneratedDate = new Date(fixedTimestamp).toISOString();

    const generatedDate = dateGenerator.getDate();

    expect(generatedDate).toBe(expectedGeneratedDate);
  });
});
