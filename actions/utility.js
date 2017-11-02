export function unmarshallToken(token){
	if(token){
	  var base64Url = token.split('.')[1];
	  var base64 = base64Url.replace('-', '+').replace('_', '/');
	  var res = JSON.parse(window.atob(base64));
	  return res;
	} 
}