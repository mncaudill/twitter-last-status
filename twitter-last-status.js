/*
* Project: twitter-last-status
* Author: Matthew Nolan Caudill (nolan@nolancaudill.com)
*/

(function () {

    window.TwitterLastStatus = {
        username: 'nolancaudill',
        callback: function (resp) {
            if (typeof resp.status === undefined) {
                return;
            }

            var text, created_at, datetime, el;

            text = ' ' + resp.status.text;
            text = text.replace(/(\s)(http(s)?:\/\/\S+)/gi, '$1<a href="$2">$2</a>');
            text = text.replace(/(\s)@([A-Za-z0-9_]+)/g, '$1<a href="http://twitter.com/$2">@$2</a>').replace(/^\s/, '');

            created_at = resp.status.created_at.split(' ');
            created_at = new Date(created_at[1] + ' ' + created_at[2] + ' ' + created_at[5] + ' ' + created_at[3] + ' ' + created_at[4]);

            datetime = created_at.toLocaleTimeString() + ' on ' + (created_at.getMonth() + 1) + '-' + created_at.getDate() + '-' + created_at.getFullYear();

            el = document.getElementById('twitter-last-status');
            if (el) {
                el.innerHTML = text + '<br/><a href="http://twitter.com/' + this.username + '">' + datetime + '</a>';
            }
        }
    };

    function init() {
        var script = document.createElement('script');
        script.charSet = 'utf-8';
        script.src = 'http://twitter.com/users/show/' + TwitterLastStatus.username + '.json?callback=TwitterLastStatus.callback&ts=' + (new Date().getTime());
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', init, false);
    } else {
        window.attachEvent('onload', init);
    }

})();
