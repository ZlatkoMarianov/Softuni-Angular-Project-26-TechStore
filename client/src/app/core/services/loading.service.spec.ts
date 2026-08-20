import { describe, expect, it } from 'vitest';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  it('is not loading initially', () => {
    const service = new LoadingService();

    expect(service.isLoading()).toBe(false);
  });

  it('stays loading until all concurrent requests stop', () => {
    const service = new LoadingService();

    service.start();
    service.start();
    service.stop();

    expect(service.isLoading()).toBe(true);

    service.stop();

    expect(service.isLoading()).toBe(false);
  });

  it('never lets the internal counter become negative', () => {
    const service = new LoadingService();

    service.stop();
    service.start();

    expect(service.isLoading()).toBe(true);
  });
});
