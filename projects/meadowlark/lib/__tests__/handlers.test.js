const handlers = require('../handlers');

test('home page renders', () => {
    const req = {};
    const res = {render: jest.fn()};
    handlers.home(req, res); // jest.fn() 호출 시 렌더링 함수 생성
    expect(res.render.mock.calls.length).toBe(1); // jest 모형 함수는 1번만 호출되어야 함
    expect(res.render.mock.calls[0][0]).toBe('home'); 
    // jest 모형 함수가 처음 호출 되었을 때(res.render.mock.calls[0]) 전달받은 첫 번째([0]) 매개변수는 home이어야 함
});

test('about page renders with fortune', () => {
    const req = {};
    const res = {render: jest.fn()};
    handlers.about(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('about');
    expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({fortune: expect.stringMatching(/\W/),
}));
});

test('404 handler renders', () => {
    const req = {};
    const res = {render: jest.fn()};
    handlers.notFound(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('404');
});

test('500 handler renders', () => {
    const err = new Error('some error');
    const req = {};
    const res = {render: jest.fn()};
    const next = jest.fn();
    handlers.serverError(err, req, res, next);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('500');
});

// run test : npm test lib/__tests__/handlers.test.js --coverage 