var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));
app.use('/public', express.static('public'))


app.get('/' , function(req , res){
    res.send('<h1>Guide main page</h1>')
});

// app.listen(3000 , function(){
//     console.log("connect 3000 port!");
// });

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
