import { describe, expect, it } from 'vitest';
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('returns short text unchanged', () => {
    expect(pipe.transform('Angular', 10)).toBe('Angular');
  });

  it('truncates long text and appends an ellipsis', () => {
    expect(pipe.transform('Angular project', 7)).toBe('Angular...');
  });

  it('removes trailing whitespace before the ellipsis', () => {
    expect(pipe.transform('Hello world', 6)).toBe('Hello...');
  });
});
