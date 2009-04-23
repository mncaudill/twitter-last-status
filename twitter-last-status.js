/*
* Project: twitter-last-status
* Author: Matthew Nolan Caudill (nolan@nolancaudill.com)
*/

var twitter_username = 'nolancaudill';
function twitter_callback (resp){
    if(typeof resp.status == 'undefined') return;

    var text = ' ' + resp.status.text;
    text = text.replace(/(\s)(http(s)?:\/\/\S+)/gi, '$1<a href="$2">$2</a>');
    text = text.replace(/(\s)@([A-Za-z0-9_]+)/g, '$1<a href="http://twitter.com/$2">@$2</a>').replace(/^\s/, '');

    var created_at = resp.status.created_at.split(' ');
    created_at = new Date(created_at[1] + ' ' + created_at[2] + ' ' + created_at[5] + ' ' + created_at[3] + ' ' + created_at[4]);

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
