const exec = require('child_process').exec;

EXEC_COMMAND = {
  "c_cpp": "mv submission a.cc;g++ a.cc -lm; ./a.out",
  "python": "python submission",
  "perl": "perl submission.cc"
}

module.exports = (ctx, done) => {
    /* replace all single quote to double quote */
    var body = ctx.body_raw.replace(/'/g,"\"")
    var body_array = body.split("\r\n");
    var lang = body_array[3].split("/")[2];
    var code = body_array.slice(7, body_array.length-2).join("\n");
    
    /* execute code */
    exec("echo '" + code + "' > io/submission; cd io/;" + EXEC_COMMAND[lang], (err , stdout , stderr) => {
        done(null, {
            'error': err,
            'stdout': stdout,
            'stderr': stderr
        })
    })
}
