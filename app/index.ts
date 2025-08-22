var Twig = require("twig"),
    express = require('express'),
    ejs = require('ejs'),
    app = express();

// This section is optional and used to configure twig.
app.set("twig options", {
    allowAsync: true, // Allow asynchronous compiling
    strict_variables: false
});
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use('/assets', express.static('assets'))
app.use("/libs/three", express.static('node_modules/three/build'));

app.get('/', function(req:any, res:any){
  res.render('index.html');
});
app.get('/sim/:id', function(req:any, res:any){
  const allowedSims: string[] = [
    "01-acceleration",
    "02-velocity",
    "03-position",
    "04-gravity",
    "05-orbit"
  ];
  if (!allowedSims.includes(req.params.id)) {
    return res.status(404).send("Not Found");
  }
  res.render('sim.html', {
    simInclude: `sim/${req.params.id}.html`,
  });
});

app.listen(3000);