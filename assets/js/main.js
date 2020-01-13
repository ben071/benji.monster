let scheme = window.matchMedia(`(prefers-color-scheme: dark)`);
let theme = window.localStorage.getItem('prefer-light');
let title = document.getElementsByClassName('title')[0];
let body = document.getElementsByTagName('body')[0];
let toggle = document.getElementsByClassName('toggle')[0];

if (theme === 'yes') {
	body.classList.add('light');
} else if (theme === 'no') {
	console.log('User does not like light, removing Light');
	body.classList.remove('light');
} else {
	if (scheme) {
		body.classList.remove('light');
		console.log('User has not yet visited, but prefers dark');
	} else {
		body.classList.add('light');
		console.log('User has not yet visited, but prefers light');
	}
}

toggle.addEventListener('click', (e) => {
	//console.log(e);
	body.classList.toggle('light');
	if (body.classList.contains('light')) {
		window.localStorage.setItem('prefer-light', 'yes');
		console.log('user likes light');
	} else {
		window.localStorage.setItem('prefer-light', 'no');
		console.log('user likes dark');
	}
});
