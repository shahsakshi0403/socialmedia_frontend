import { loginExpiryTime } from './../../environments/environment';

//this function sets the value in localstorage with validity of 24 hours
export function setWithExpiry(key, value) {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + loginExpiryTime,
	}
	localStorage.setItem(key, JSON.stringify(item));
}

//this function gets the value in localstorage and checks if it's validity expired or not(24 hours)
export function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	//  console.log('Expiry Time: ',item.expiry);
	//  console.log('Now Time:',now.getTime());
	//  console.log('Condition:',now.getTime()>item.expiry);
	
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
}