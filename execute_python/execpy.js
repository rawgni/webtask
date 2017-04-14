const exec = require('child_process').exec;

module.exports = (ctx, done) => {
    var body_array = ctx.body_raw.split("\r\n");
    /* execute python code */
    exec("echo \"" + body_array.slice(3, body_array.length-2).join("\n") + "\" | python", (err , stdout , stderr) => {
        done(null, {
            'error': err,
            'stdout': stdout,
            'stderr': stderr
        })
    })
}
