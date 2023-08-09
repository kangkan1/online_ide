const { execSync } = require('child_process');
const fs = require('fs');
module.exports.home = function(req, res){
    //return res.end('<h1>Running</h1>');
    return res.render('home', {title: "Home"})
}

module.exports.compile = function(req, res){
    //return res.end('<h1>Running</h1>');
    console.log(req.body)
    let body = req.body
    let result  = ""
    let status = "ok"
    try {
        fs.writeFileSync('compiler/python.py', body.code);
        //console.log('Successfully wrote to file');
    } catch (err) {
        //console.error('Error writing to file:', err);
    }
    try {
        const stdout = execSync('python3 compiler/python.py');
        console.log(`stdout: ${stdout.toString()}`);
        result = stdout.toString()
      } catch (error) {
        status = "fail"
        result = error.toString('utf8')
        console.error(`Error executing command: ${error}`);
      }
    
    return res.send({status:status, result:result})
    // return res.render('home', {title: "Home"})
}