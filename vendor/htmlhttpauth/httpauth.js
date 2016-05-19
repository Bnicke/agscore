window.onload = function()
{
    var anchors = document.getElementsByTagName("a");
    for (var foo = 0; foo < anchors.length; foo++) {
        if (anchors[foo].className == "httpauth") {
            createForm(anchors[foo]);
        }
    }
}

function createForm(httpauth)
{
    var form = document.createElement("form");
    form.action = httpauth.href;
    form.method = "get";
    form.onsubmit = login;
    form.id = httpauth.id;
    var userdiv = document.createElement("div"); 
    userdiv.className = "focus";
    var passdiv = document.createElement("div"); 
    passdiv.className = "focus";
    var submitdiv = document.createElement("div"); 
    submitdiv.className = "focus";
    var username = document.createElement("label");
    var usernameInput = document.createElement("input");
    usernameInput.name = "username";
    usernameInput.type = "text";
    usernameInput.className = "form-control";
    usernameInput.id = httpauth.id + "-username";
    username.appendChild(document.createTextNode("Username:"));
    username.appendChild(usernameInput);
    userdiv.appendChild(username);
    var password = document.createElement("label");
    var passwordInput = document.createElement("input");
    passwordInput.name = "password";
    passwordInput.type = "password";
    passwordInput.className = "form-control";
    passwordInput.id = httpauth.id + "-password";
    password.appendChild(document.createTextNode("Password:"));
    password.appendChild(passwordInput);
    passdiv.appendChild(password);
    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Log in";
    submit.className = "btn btn-default";
    submitdiv.appendChild(submit);
    form.appendChild(userdiv);
    form.appendChild(passdiv);
    form.appendChild(submitdiv);
//    var logoutLink = document.createElement("a");
//    logoutLink.href = "#";
//    logoutLink.onclick = logout;
//    logoutLink.appendChild(document.createTextNode("Log out"));
//    form.appendChild(logoutLink);
    httpauth.parentNode.replaceChild(form, httpauth);
}

function getHTTPObject() {
	var xmlhttp = false;
	if (typeof XMLHttpRequest != 'undefined') {
		try {
			xmlhttp = new XMLHttpRequest();
		} catch (e) {
			xmlhttp = false;
		}
	} else {
        /*@cc_on
        @if (@_jscript_version >= 5)
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
        @end @*/
    }
	return xmlhttp;
}
function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}
function login()
{	
    var username = document.getElementById(this.id + "-username").value;
    var password = document.getElementById(this.id + "-password").value;
    var url = this.action;
    var post = JSON.parse("{}");
    var now = new Date();
    post.timestamp = now.getTime();
    post.username = username;
    var http = getHTTPObject();
    http.open("post", url, false, username, password);
    http.setRequestHeader('Authorization', make_base_auth(username, password));
    http.send(JSON.stringify(post));
	if (http.status == 201) {
		$.mobility.notify("Thank you, you are logged in as " + username + "." ,"success");
		$.mobility.modalClose('#profile')
		createCookie("username",username);
		createCookie("ba", make_base_auth(username, password));
		bacreds =  make_base_auth(username, password);
		baheader = "Authorization";
		initcompetition();
	} else {
	$.mobility.notify("Incorrect username and/or password!","error");
		bacreds =  "";
		baheader = "Dummy";
		eraseCookie("username");
		eraseCookie("ba");
		username="User";
		initcompetition();
    }
    return false;
}

function logout()
{
    var http = getHTTPObject();
                bacreds =  "";
                baheader = "Dummy";
                eraseCookie("username");
                eraseCookie("ba");
                username="User";
    http.open("get", this.parentNode.action, false, "null", "null");
    http.send("");
    $.mobility.notify("You have been logged out.","success");
    initcompetition();
    return false;
}
