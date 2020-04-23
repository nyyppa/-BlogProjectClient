import React from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Form from './Form';
const inputs = [{
    name: "username",
    placeholder: "username",
    type: "text"
},{
    name: "password",
    placeholder: "password",
    type: "password"
},{
    type: "submit",
    value: "Submit",
    className: "btn"
}]

const props = {
    name: 'loginForm',
    method: 'POST',
    action: '/perform_login',
    inputs: inputs
}
const params = new URLSearchParams(window.location.search)
var logout = function() {
    $.post("/logout", function() {
        $("#user").html('');
        localStorage.setItem("login", "false");
    })
    return true;
}
function LoginPage(){
    let login = localStorage.getItem("login") === "true";
    $.get("/user", function(data) {
        $("#user").html(data.name);
        localStorage.setItem("login", "true");
    });
    $.ajaxSetup({
        beforeSend : function(xhr, settings) {
            if (settings.type == 'POST' || settings.type == 'PUT'
                || settings.type == 'DELETE') {
                if (!(/^http:.*/.test(settings.url) || /^https:.*/
                    .test(settings.url))) {
                    // Only send the token to relative URLs i.e. locally.
                    xhr.setRequestHeader("X-XSRF-TOKEN",
                        Cookies.get('XSRF-TOKEN'));
                }
            }
        }
    });
    if(login){
        return (
            <div>
                <p>logged</p>
                <div>
                    Logged in as: <span id="user"></span>
                </div>
                <div>
                    <button onClick={logout} className="btn btn-primary">Logout</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Form {...props} error={params.get('error')}/>
                <br/>
                <div>
                    With GitHub: <a href="/oauth2/authorization/github">click here</a>
                </div>
            </div>
        );
    }
}
export default LoginPage;