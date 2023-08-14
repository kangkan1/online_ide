const { execSync } = require('child_process');
const fs = require('fs');
let file = 'compiler/lang/python.py'
let folder = 'compiler/lang';

function compile(code, custom_input=""){
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
        const stdout = execSync(`echo "${custom_input}" | python3 ${file}`);
        // console.log(`stdout: ${stdout.toString()}`);
        result = stdout.toString()
      } catch (error) {
        status = "fail"
        result = error.toString('utf8')
        // console.error(`Error executing command: ${error}`);
    }
    try{
        fs.unlinkSync(file);
        fs.unlinkSync('compiler/lang/Main.class');
    }catch (error) {

    }
    return {status:status, result:result}
}

module.exports = {
    compile
};