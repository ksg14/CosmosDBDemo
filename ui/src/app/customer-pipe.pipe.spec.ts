import { CustomerPipePipe } from './customer-pipe.pipe';

describe('CustomerPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomerPipePipe();
    expect(pipe).toBeTruthy();
  });
});
