const { execSync } = require('child_process');
const fs = require('fs');
 const python = require('../compiler/python_compiler')
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
        let compile = python.compile(body.code)
        return res.send({status:compile.status, result:compile.result})
    }else{
        return res.send({status:'fail', result:'Currently configured only for python'})
    }
    

}