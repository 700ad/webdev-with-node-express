const fortune = require('./fortune');

exports.home = (req, res) => res.render('home');

exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() })

exports.notFound = (req, res) => res.render('404');

// eslint-disable-next-line no-unused-vars
exports.serverError = (err, req, res, next) => res.render('500');

exports.newsLetterSignup = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}
// eslint-disable-next-line no-unused-vars
exports.newsLetterSignupProcess = (req, res) => {
    console.log(`Form (QueryString): ${req.query.form}`);
    console.log(`CSRF Token (hidden field): ${req.body._csrf}`);
    console.log(`Name (visible form field): ${req.body.name}`);
    console.log(`Email (visible form field): ${req.body.email}`);
    console.log(`303 '/newsletter-signup/thank-you'`);
}

exports.newsLetterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you');

exports.newsletter = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

exports.api = {
    newsLetterSignup: (req, res) => {
        console.log(`CSRF Token (hidden field): ${req.body._csrf}`);
        console.log(`Name (visible form field): ${req.body.name}`);
        console.log(`Email (visible form field): ${req.body.email}`);
        res.send({ result: 'success' })
    }
}