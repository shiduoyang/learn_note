export function GlobalMiddleware(req, res, next) {
    console.log('in globalMiddleware');
    next();
}