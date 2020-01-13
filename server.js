//! Deps
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const hbs = require('express-handlebars');
const UA = require('ua-parser-js');
const exec = require('shell-exec');
const simpleIcons = require('simple-icons');

const con = require('./constants');
let {
	port,
	hostname
} = {
	port: 6214
	//hostname: '67.182.206.28'
};

const app = express();

app.engine(
	'hbs',
	hbs({
		extname: 'hbs',
		defaultView: 'default'
	})
);

app.set('view engine', 'hbs');
app.set('json spaces', 4);
app.use('/assets', express.static('./assets'));
app.set('view options', {
	layout: false
});
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(helmet());
app.use(compression());
app.use(cors());
// Logging
app.use(
	morgan((tokens, req, res) => {
		return [
			chalk.hex('#34ace0').bold(`[ ${tokens.method(req, res)} ]`),
			chalk.hex('#ffb142').bold(tokens.status(req, res)),
			chalk.hex('#ff5252').bold(req.hostname + tokens.url(req, res)),
			chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + 'ms'),
			chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res))
		].join(' ');
	})
);

module.exports = (client) => {
	app.get('/', async (req, res) => {
		/* 		var ua = UA(req.headers['user-agent']);
		console.log(ua) */
		res.render('index', {
			layout: 'main',
			name: con.name,
			host: req.hostname,
			social: [{
					name: 'Twitter',
					color: '1DA1F2',
					link: 'twitter.com/BenjiTheFurry',
					icon: simpleIcons.Twitter
				},

				{
					name: 'Github',
					color: '3088d4',
					link: 'github.com/Ben071',
					icon: simpleIcons.GitHub,
				},
				{
					name: 'Discord',
					color: '7289da',
					link: 'furretreat.rocks',
					icon: simpleIcons.Discord
				},
				{
					name: 'Instagram',
					color: 'f16061',
					link: 'instagram.com/BenjiTheFurry',
					icon: simpleIcons.Instagram
				},
				{
					name: 'FurAffinity',
					color: 'f16061',
					link: 'furaffinity.net/user/ben071',
					icon: simpleIcons['Fur Affinity']
				},
				{
					name: 'Telegram',
					color: '6441a4',
					link: 't.me/Ben0710',
					icon: simpleIcons.Telegram
				}
			]
		});
	});

	// Twitter / Discord / Github / FurAffinity / Instagram / Telegram

	app.listen(port /* , hostname */ , () => {
		console.log(`[ Server ] Listening on ${port}`);
	});
};