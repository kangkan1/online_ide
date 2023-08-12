const { execSync } = require('child_process');
const fs = require('fs');
let file = 'compiler/lang/cplusplus.cpp'
let folder = 'compiler/lang';

function compile(code){
    let result  = ""
    let status = "ok"
    console.log(code)
    try {
        fs.writeFileSync(file, code);
        //console.log('Successfully wrote to file');
    } catch (err) {
        status = 'fail';
        result = err;
        //console.error('Error writing to file:', err);
    }
    try {
        const stdout = execSync(`cd ${folder} &&  g++ cplusplus.cpp -o cplusplus.out && ./cplusplus.out`);
        // console.log(`stdout: ${stdout.toString()}`);
        result = stdout.toString()
      } catch (error) {
        status = "fail"
        result = error.toString('utf8')
        // console.error(`Error executing command: ${error}`);
    }
    fs.unlinkSync(file);
    fs.unlinkSync('compiler/lang/cplusplus.out');
    return {status:status, result:result}
}

module.exports = {
    compile
};