const exec = require('child_process').exec

module.exports = (ctx, done) => {
    /* execute python code */
    exec("echo \"" + ctx.body_raw.split("\r\n")[4] + "\" | python", (err , stdout , stderr) => {
        done(null, {
            'error': err,
            'stdout': stdout,
            'stderr': stderr
        })
    })
}
