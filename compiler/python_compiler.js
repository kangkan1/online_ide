const { execSync } = require('child_process');
const fs = require('fs');
let file = 'compiler/lang/python.py'
let folder = 'compiler/lang';

function compile(code, custom_input=""){
    let result  = ""
    let status = "ok"
    let time = "";
    try {
        fs.writeFileSync(file, code);
        //console.log('Successfully wrote to file');
    } catch (err) {
        status = 'fail';
        result = err;
        //console.error('Error writing to file:', err);
    }
    try {
        let startTime = process.hrtime();
        const stdout = execSync(`echo "${custom_input}" | python3 ${file}`);
        let diff = process.hrtime(startTime);
        // console.log(diff)
        let elapsedTime = diff[0] * 1e3 + diff[1] * 1e-6;  // Convert to milliseconds
        time = "Compile time: "+elapsedTime.toFixed(3) +" ms";
        
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
    return {status:status, result:result,time:time}
}

module.exports = {
    compile
};