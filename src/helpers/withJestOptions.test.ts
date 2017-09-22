import withJestOptions from './withJestOptions';

const helper = withJestOptions((desc, callback, it?) => {
    it(desc, callback);
});

const dummy = jest.fn();
helper.skip('can forward Jest options', () => dummy());

it('can forward jest options', () => {
    expect(dummy).not.toHaveBeenCalled();
});
