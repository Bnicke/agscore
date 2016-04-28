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

function login()
{
    var username = document.getElementById(this.id + "-username").value;
    var password = document.getElementById(this.id + "-password").value;
    var http = getHTTPObject();
	//var url = "http://" + username + ":" + password + "@" + this.action.substr(7);
	var url = this.action;
    http.open("get", url, false, username, password);
    http.send("");
	if (http.status == 200) {
		$.mobility.notify("Thank you, you are logged in as " + username + "." ,"success");
		$.mobility.modalClose('#profile')
	} else {
	$.mobility.notify("Incorrect username and/or password!","error");
    }
    return false;
}

function logout()
{
    var http = getHTTPObject();
    http.open("get", this.parentNode.action, false, "null", "null");
    http.send("");
    alert("You have been logged out.");
    return false;
}
