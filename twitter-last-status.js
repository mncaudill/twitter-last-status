/*
Copyright (c) 2009, Matthew Nolan Caudill
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var twitter_username = 'nolancaudill';
function twitter_callback (resp){
    if(resp.status == undefined) return;
    var text = ' ' + resp.status.text;
    text = text.replace(/(\s)(http(s)?:\/\/\S+)/gi, '$1<a href="$2">$2</a>');
    text = text.replace(/(\s)@([A-Za-z0-9_]+)/g, '$1<a href="http://twitter.com/$2">@$2</a>').replace(/^\s/, '');
    var created_at = new Date(resp.status.created_at);
    var datetime = created_at.toLocaleTimeString() + ' on ' + (created_at.getMonth()+1) + '-' + created_at.getDate() + '-' + created_at.getFullYear();
    var el = document.getElementById('twitter-last-status');
    if(el) {
        el.innerHTML = text + '<br/><a href="http://twitter.com/' + twitter_username + '">' + datetime + '</a>';
    }
}
(function(){
    function init() {
        if(!twitter_username) return;
        var script = document.createElement('script');
        script.src = 'http://twitter.com/users/show/' + twitter_username + '.json?callback=twitter_callback&ts=' + (new Date().getTime());
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    var curr_onload = window.onload;
    if(typeof curr_onload == 'function') {
        window.onload = function(){
            curr_onload();
            init();
        }
    } else {
        window.onload = init;
    }
})();
