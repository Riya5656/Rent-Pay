var express = require('express');
var router = express.Router();
var owner=require('../Resource/owner_login');
const Bill= require('../models/created_bill');
var renter=require('../Resource/renter_login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
router.get('/login',function(req,res,next){
  res.render('login');
});

router.get('/owner_login',function(req,res,next){
  res.render('owner_login');
});

router.get('/logged_in',function(req,res,next){
  res.render('owner_dashboard');
});



router.post('/submit',function(req,res,next){
  const owner_name=req.body.email;
  const owner_password=req.body.password;
  console.log(owner[0]['username'])
  if (owner_name==owner[0]['username'] && owner_password==owner[0]['password']){
    res.redirect('/logged_in');
  }
  else{
    res.redirect('/wrong')
  }
});

router.get('/wrong',function(req,res,next){
  res.render('warn');
});




router.post('/create_bill',function(req,res,next){
  res.redirect('/fill_bill');
});

router.get('/fill_bill',function(req,res,next){
  res.render('create_bill');
});



router.post('/send', async function(req,res,next){
  await Bill.insertMany([{id:req.body.id, issued_to:req.body.name, issued_date:req.body.date,total_amount: req.body.amount,deadline: req.body.deadline}]);
  res.redirect('/send_bill');
});

router.get('/send_bill',function(req,res,next){
  res.render('ack');
});


router.get('/renter_login',function(req,res,next){
  res.render('renter_login');
});


router.post('/renter_submit',function(req,res,next){
  const renter_name=req.body.email;
  const renter_password=req.body.password;
  console.log(renter[0]['username'])
  if (renter_name==renter[0]['username'] && renter_password==renter[0]['password']){
    res.redirect('/log_in');
  }
  else{
    res.redirect('/incorrect')
  }
});

router.get('/incorrect',function(req,res,next){
  res.render('incorrect');
});


router.get('/log_in',function(req,res,next){
  res.render('renter_dashboard');
});

router.post('/view_bill',function(req,res,next){
  res.redirect('/show_bill');
});

router.get('/show_bill',async function(req,res,next){
  const bills=await Bill.find();

  res.render('show_bill',{bill1:bills});
});



module.exports = router;
