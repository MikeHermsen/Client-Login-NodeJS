const express = require('express');
const app = express();

app.set('view-engine', 'ejs');

app.engine('ejs', require('express-ejs-extend'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.render('login.ejs', { name : 'Mikey_'});
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.listen(3000);