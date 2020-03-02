import { ConversationDatePipe } from './conversation-date.pipe';

describe('ConversationDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ConversationDatePipe(null);
    expect(pipe).toBeTruthy();
  });
});
