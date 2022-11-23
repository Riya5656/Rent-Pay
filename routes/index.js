var express = require('express');
var router = express.Router();
const Bill= require('../models/created_bill');
const Own= require('../models/own_registration');
const Rent= require('../models/rent_registration');
const { count } = require('../models/created_bill');
var renter=require('../Resource/renter_login');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
router.get('/login',function(req,res,next){
  res.render('login');
});

router.get('/register',function(req,res,next){
  res.render('register');
});

router.get('/owner_login',function(req,res,next){
  res.render('owner_login');
});

router.get('/logged_in',function(req,res,next){
  res.render('owner_dashboard');
});
router.get('/owner_reg',function(req,res,next){
  res.render('owner_reg');
});
router.get('/renter_reg',function(req,res,next){
  res.render('renter_reg');
});


router.post('/submit', async function(req,res,next){
  let got=await Own.findOne({email:req.body.email});
  let got2=await Own.findOne({pass:req.body.password});
  if(got && got2){
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

router.post('/register', async function(req,res,next){
  await Own.insertMany([{fname:req.body.fname, lname:req.body.lname, email:req.body.email,phno: req.body.phno,pass: req.body.pass}]);
  res.redirect('/');
});

router.post('/rent_register', async function(req,res,next){
  await Rent.insertMany([{fname:req.body.fname, lname:req.body.lname, email:req.body.email,phno: req.body.phno,pass: req.body.pass}]);
  res.redirect('/');
});


router.get('/renter_login',function(req,res,next){
  res.render('renter_login');
});


// router.post('/renter_submit', async function(req,res,next){
//   let got4=await Rent.findOne({email:req.body.email});
//   let got5=await Rent.findOne({pass:req.body.password});
//   if(got4 && got5){
//     res.redirect('/rente');
//   }
//   else{
//        res.redirect('/inc')
//      }
// });


// router.get('/rente',function(req,res,next){
//   res.render('renter_dashboard');
// });


  //const renter_id=req.params.id;
  

router.post('/renter_submit',function(req,res,next){
  //const renter_id=req.params.id;
const renter_name=req.body.email;
const renter_password=req.body.password;
let counter = 0;

for (let i = 0; i < renter.length; i++) {
   counter++;
}
for(let j=0;j<counter;j++){

  if(renter_name==renter[j]['username']&& renter_password==renter[j]['password']){
    const rentee=renter[j]['name'];
    const rentee_id=renter[j]['id'];
    res.render('renter_dashboard',{Name: rentee,id:rentee_id});
  }
}
  res.redirect('/incorrect')

});


router.get('/incorrect',function(req,res,next){
  res.render('incorrect');
});


router.get('/view_bill/:id', async function(req,res,next){
  const bills=await Bill.find({id:req.params.id});
  res.render('show_bill',{bill1:bills});
});

module.exports = router;
