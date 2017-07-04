var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/public', express.static('public'))


app.get('/' , function(req , res){
    res.send('<h1>Ho</h1>')
});

// app.listen(3000 , function(){
//     console.log("connect 3000 port!");
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
