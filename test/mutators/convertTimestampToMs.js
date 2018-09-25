import { expect } from 'chai';
import convertTimestampToMs from '../../src/mutators/convertTimestampToMs';

describe('convertTimestampToSeconds mutator', () => {
  it('converts a second to a millisecond', () => {
    expect(convertTimestampToMs(1)).to.equal(1000);
  });

  it('converts epoch timestamps from seconds to milliseconds', () => {
    const epochTimestampInMs = 1538288268000;
    const epochTimestampInSeconds = 1538288268;
    const result = convertTimestampToMs(epochTimestampInSeconds);
    expect(result).to.equal(epochTimestampInMs);
  });
});
