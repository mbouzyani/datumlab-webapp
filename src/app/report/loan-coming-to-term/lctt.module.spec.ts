import { LcttbModule } from './lctt.module';

describe('lcttModule', () => {
  let lcttModule: LcttbModule;

  beforeEach(() => {
    lcttModule = new LcttbModule();
  });

  it('should create an instance', () => {
    expect(lcttModule).toBeTruthy();
  });
});
