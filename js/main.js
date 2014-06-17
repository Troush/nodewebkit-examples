$(document).ready(function() {
    auth = function() { 
         if (localStorage.length > 0) {
            var username = localStorage.getItem('username');
            $('#username').text(username);
            return true;
        } else {
            if (window.location.pathname.indexOf('index') < 0 && window.location.pathname.indexOf('create.html') < 0) {
                window.location = 'index.html';
                return false;
            }
        }
     }
    if (window.location.pathname.indexOf('index') > 0) {
        var authAnswer = auth();
        if (authAnswer) {
            window.location = 'app.html';   
        }
        var form = {
            login: $('#login'),  
            password: $('#pwd'),
            check: function(context) {
                if (context.login.val() == 'admin' &&
                    context.password.val() == 'admin') {
                    localStorage.setItem('username', 'admin');
                    window.location = "app.html";
                } else {
                    alert('Login name or password is incorrect');
                }
            }
        }
        $('#login-btn').click(function(e){
            form.check(form);
        });
    }
    if (window.location.pathname.indexOf('app.html') > 0) {
        $('#logout').click(function(e){
            localStorage.clear();
            window.location = 'index.html';
        });
        $('#start').click(function(e){
            var spawn = require('child_process').spawn;
            var prc = spawn('/home/troush/Work/cursova/Chapter8_FaceRecognition/build/WebcamFaceRec', [], { stdio: 'inherit' });

            //noinspection JSUnresolvedFunction
            prc.stdout.setEncoding('utf8');
            prc.stdout.on('data', function (data) {
                var str = data.toString()
                var lines = str.split(/(\r?\n)/g);
                console.log(lines.join(""));
            });

            prc.on('close', function (code) {
                console.log('process exit code ' + code);
            });

            prc.on('error', function (e) {
                console.log('error: ' + e);
            });

        });
    }
    if (window.location.pathname.indexOf('create.html') > 0) {
        $('#file').change(function(e){
            var photoCount = $('select#filesList option').length + 1;
            $('select#filesList').append(new Option("photo"+photoCount+'.png', "photo"+photoCount));
        });
    }

     auth();
});