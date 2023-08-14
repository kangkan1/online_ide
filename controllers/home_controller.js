const { execSync } = require('child_process');
const fs = require('fs');
const python = require('../compiler/python_compiler');
const javascript = require('../compiler/javascript_compiler');
const java = require('../compiler/java_compiler');
const cpp = require('../compiler/cpp_compiler');
const c = require('../compiler/c_compiler');
const php = require('../compiler/php_compiler');
// import {python_compiler} from '../compiler/python_compiler';

module.exports.home = function(req, res){
    //return res.end('<h1>Running</h1>');
    return res.render('home', {title: "Home"})
}

module.exports.compile = function(req, res){
    //return res.end('<h1>Running</h1>');
    // console.log(req.body)
    let body = req.body
    
    let result  = ""
    let status = "ok"
    if(body.language === 'python'){
        let compile = python.compile(body.code, body.custom_input)
        return res.send({status:compile.status, result:compile.result})
    }else if(body.language === 'js'){
        let compile = javascript.compile(body.code, body.custom_input)
        return res.send({status:compile.status, result:compile.result})
    }else if(body.language === 'java'){
        let compile = java.compile(body.code, body.custom_input)
        return res.send({status:compile.status, result:compile.result})
    }else if(body.language === 'cpp'){
        let compile = cpp.compile(body.code, body.custom_input)
        return res.send({status:compile.status, result:compile.result})
    }else if(body.language === 'c'){
        let compile = c.compile(body.code, body.custom_input)
        return res.send({status:compile.status, result:compile.result})
    }else if(body.language === 'php'){
        let compile = php.compile(body.code, body.custom_input)
        return res.send({status:compile.status, result:compile.result})
    }
    else{
        return res.send({status:'fail', result:'Currently configured only for this language'})
    }
    

}