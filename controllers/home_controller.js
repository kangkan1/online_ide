

module.exports.home = function(req, res){
    //return res.end('<h1>Running</h1>');
    return res.render('home', {title: "Home"})
}

module.exports.compile = function(req, res){
    //return res.end('<h1>Running</h1>');
    console.log(req.body)
    return res.send({status:"ok"})
    // return res.render('home', {title: "Home"})
}