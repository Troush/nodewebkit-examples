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
