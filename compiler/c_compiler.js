const { execSync } = require('child_process');
const fs = require('fs');
let file = 'compiler/lang/c.c';

let folder = 'compiler/lang';

function compile(code, custom_input){
    let result  = ""
    let status = "ok"
    // console.log(custom_input)
    // custom_input = custom_input.replace("\n", " ");
    // console.log(custom_input)
    try {
        fs.writeFileSync(file, code);
        //console.log('Successfully wrote to file');
    } catch (err) {
        status = 'fail';
        result = err;
        //console.error('Error writing to file:', err);
    }
    try {
        const stdout = execSync(`cd ${folder} &&  gcc c.c -o c.out && echo ${custom_input} | ./c.out `, {
            timeout:5000
        });
        // console.log(`stdout: ${stdout.toString()}`);
        result = stdout.toString()
    } catch (error) {
        status = "fail"
        result = error.toString('utf8')
        // console.error(`Error executing command: ${error}`);
    }
    try{
        fs.unlinkSync(file);
        fs.unlinkSync('compiler/lang/c.out');
    }catch (error) {
    }   
    
    return {status:status, result:result}
}

module.exports = {
    compile
};