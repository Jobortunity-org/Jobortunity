'use strict';

require('dotenv').config();
const express = require('express');
let superagent = require('superagent');
let methodOverride = require('method-override');


let pg = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


const app = express();

// Use this as a talking point about environment variables
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));




app.get('/', handleHomePage);
app.get('/login', handelLogin);
app.post('/loginDB', CheckDBLogin);
app.get('/signup/:type', singUpPages);
app.post('/signup/:type', handelSignup);
app.get('/Applicant/:id', handelApplicant);
app.get('/ApplicantFE/:id', handelApplicantForEmp);
app.get('/Employer/:id', handelEmployer);
app.put('/Applicant/:id', ApplicantUpdate);
app.delete('/Applicant/:id', ApplicantDelete);
app.get('/jobs', githubjob);
app.get('/job', searchjob);
app.get('/compare', comparing);
app.get('/feedback', handleFeedback);


/***********************CONSTRUCTOR START *********************************************** */

function Applicant(personApplicant) {
  this.fullname = personApplicant.fullname;
  this.email = personApplicant.email;
  this.pass = personApplicant.pass;
  this.dob = personApplicant.dob;
  this.phonenumber = personApplicant.phonenumber;
  this.jobtitle = personApplicant.jobtitle;
  this.applicantaddress = personApplicant.applicantaddress;
  this.aboutme = personApplicant.aboutme;
  this.achievement = personApplicant.achievement;
  this.images = personApplicant.images;
  this.video = personApplicant.video;

}

function Empolyer(personEmployer) {
  this.fullname = personEmployer.fullname;
  this.email = personEmployer.email;
  this.pass = personEmployer.pass;
  this.dob = personEmployer.dob;
  this.phonenumber = personEmployer.phonenumber;
  this.companyname = personEmployer.companyname;
  this.companylocation = personEmployer.companylocation;
  this.companyindustry = personEmployer.companyindustry;

} function Job(object) {
  this.title = object.title;
  this.description = object.description;
  this.type = object.type;
}

function Jobb(object) {
  this.title = object.title;
  this.description = object.description ? object.description : 'No Available Description For This Job';
  this.label = object.category.label ? object.category.label : 'No Available Category For This Job';
  this.salary = object.salary_max ? object.salary_max : 'No Available Salary For This Job';
  this.time = object.contract_time ? object.contract_time : 'No Available Contract Time For This Job';
}
/***********************CONSTRUCTOR end *********************************************** */

/*************************************** jobs  api begin ********************************/
function comparing(req, res) {
  searchjob(req, res).then(dataJobsRecived => {
    res.render('employee/compareSkill', { jobs: dataJobsRecived });
  }).catch(error => {
    console.log('Error in coparing call', error);
  });
}



function githubjob(request, response) {
  let description = request.query.description;
  superagent.get(`https://jobs.github.com/positions.json?description=${description}`)
    .then((data) => {
      let jsonOjb = data.body;
      console.log(jsonOjb);
      let value = jsonOjb.map(element => {
        return new Job(element);
      });
      response.status(200).json(value);
    }).catch((error) => {
      response.status(200).send('Sorry, something went wrong' + error);
    });
}

// function searchjob(request, response) {
//   let description = request.query.description;
//   let ID = process.env.ID;
//   let API_KEY = process.env.API_KEY;
//   superagent.get(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${ID}&app_key=${API_KEY}&results_per_page=20&what=${description}&content-type=application/json`)
//     .then((data) => {
//       let jsonOjb = data.body.results;
//       console.log(jsonOjb);
//       let value = jsonOjb.map(element => {
//         return new Jobb(element);
//       });
//       console.log(value);
//       response.status(200).send(value);
//     }).catch((error) => {
//       response.status(200).send('Sorry, something went wrong' + error);
//     });
// }

function searchjob(request, response) {
  let description = request.query.description;
  let ID = process.env.ID;
  let API_KEY = process.env.API_KEY;
  return superagent.get(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${ID}&app_key=${API_KEY}&results_per_page=50&what=${description}&content-type=application/json`)
    .then((data) => {
      let jsonOjb = data.body.results;
      let value = jsonOjb.map(element => {
        return new Jobb(element);
      });
      return value;
    }).catch((error) => {
      response.status(200).send('Sorry, something went wrong' + error);
    });
}

/************************************** jobs  api end ************************************/

function ApplicantDelete(req, res) {

  let id = req.params.id;
  let statement = `DELETE FROM applicants WHERE id=${id};`;
  client.query(statement).then(data => {
    console.log('item deleted ... ' + id);
    res.redirect(`/`);
  }).catch((error) => {
    console.log('error happend when deleteing data...', error);
  });

}


function handelEmployer(req, res) {

  let employerId = req.params.id;
  let stetment = `SELECT * FROM employers WHERE id=${employerId};`;
  let selectByStetment = `SELECT DISTINCT jobtitle FROM applicants;`;
  let selectApplicantStetment =`SELECT * FROM applicants;`;

  client.query(selectByStetment).then( data =>{
    let jobtitleInfo = data.rows;
    console.log(jobtitleInfo);

    client.query(selectApplicantStetment).then( data =>{
      let applicantProfiles = data.rows;
      console.log(applicantProfiles);
      client.query(stetment).then(data => {

        let EmployerInfo = data.rows[0];
        res.render('employers/employer', { EmployerInfo: EmployerInfo , jobtitleInfo:jobtitleInfo ,applicantProfiles:applicantProfiles});
      }).catch((error) => {
        console.log('error happend in the handelEmployers SQL', error);
      });


    }).catch((error) => {
      console.log('error happend in the handelEmployers selectApplicantStetment SQL', error);
    });



  }).catch( error => {

    console.log('error happend in the handelEmployers selectByStetment', error);
  });

}

function handelApplicant(req, res) {

  let applicantId = req.params.id;

  let stetment = `SELECT * FROM applicants WHERE id=${applicantId};`;

  client.query(stetment).then(data => {

    let ApplicantInfo = data.rows[0];

    res.render('employee/edit', { ApplicantInfo: ApplicantInfo });

  }).catch((error) => {
    console.log('error happend in the handelApplicant SQL', error);
  });
}

function handelApplicantForEmp(req, res) {

  let applicantId = req.params.id;

  let stetment = `SELECT * FROM applicants WHERE id=${applicantId};`;

  client.query(stetment).then(data => {

    let ApplicantInfo = data.rows[0];

    res.render('employee/employee', { ApplicantInfo: ApplicantInfo });

  }).catch((error) => {
    console.log('error happend in the handelApplicant SQL', error);
  });
}

function singUpPages(req, res) {

  let type = req.params.type;

  if (type === 'Applicant')
    res.render('signupApplicant');
  else
    res.render('signupEmployer');

}

function handelSignup(req, res) {
  let type = req.params.type;

  let statment = '';
  let values = [];

  if (type === 'Applicant') {

    let { fullname, email, pass, DOB, phonenumber } = req.body;
    statment = `INSERT INTO applicants (fullname, email, pass,phonenumber, DOB,jobtitle, applicantaddress, aboutme, achievement,images, video) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;`;

    values = [fullname, email, pass, phonenumber, DOB, 'Enter Your Job Title', 'Enter Your Address', ' Tell Us some Thing about you', 'Achievement Field', '../../public/media/images/image.png', ' https://www.youtube.com/embed/yinKq8M8FwQ'];

  } else if (type === 'Employer') {

    let { fullname, email, pass, DOB, phonenumber, companyname, companyindustry, companylocation } = req.body;
    statment = `INSERT INTO employers (fullname, email, pass, DOB,phonenumber, companyname,companylocation,companyindustry) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`;

    values = [fullname, email, pass, DOB, phonenumber, companyname, companyindustry, companylocation];
  }

  client.query(statment, values).then(result => {
    let data = result.rows;

    if (type === 'Applicant') {
      let ApplicantInfo = result.rows[0].id;
      res.redirect(`/Applicant/${ApplicantInfo}`);
      // res.send(result.rows[0]);
    } else if (type === 'Employer') {
      res.send(result.rows[0]);
    }

  }).catch(error => {
    console.log('Error Occured In Insert Statment In handelSignup  ', error);
  });

}


function handelLogin(req, res) {
  let type = req.query.type;
  console.log(type);
  let singUpClicked = type === 'Applicant' ? '/signup/Applicant' : 'signup/Employer';

  res.render('login', { type: type, singUp: singUpClicked });
  // console.log(type);

}

function CheckDBLogin(req, res) {

  let type = req.body;
  let statment = '';
  if (type.type === 'Applicant') {

    statment = `SELECT * FROM applicants WHERE email='${type.email}' AND pass='${type.pass}';`;
  } else if (type.type === 'Employer') {
    statment = `SELECT * FROM employers WHERE email='${type.email}' AND pass='${type.pass}';`;
  }

  client.query(statment).then(data => {

    if (data.rowCount !== 0) {
      res.redirect(`/${type.type}/${data.rows[0].id}`);
    } else {
      res.render('error',{errorMsg:'Login Failed: Invalid Username Or Password.',prePage:`/login?type=${type.type}`});

    }

  }).catch(error => {
    console.log('Error In query at CheckDBLogin', error);
  });




}


// Test PAGE STARTS HERE \\
function handleHomePage(req, res) {

  res.render('index');
}


function ApplicantUpdate(req, res) {
  let id = req.params.id;
  let recievedUpdate = req.body;
  console.log(recievedUpdate, id);
  let statement = `UPDATE applicants SET fullname =$1, email=$2, phonenumber=$3, DOB=$4, jobtitle=$5 ,applicantaddress=$6 ,aboutme=$7,achievement=$8,images=$9,video=$10 WHERE id=$11;`;
  let values = [recievedUpdate.fullname, recievedUpdate.email, recievedUpdate.phonenumber, recievedUpdate.dob, recievedUpdate.jobtitle, recievedUpdate.applicantaddress, recievedUpdate.aboutme, recievedUpdate.achievement, recievedUpdate.images, recievedUpdate.video, id];
  client.query(statement, values).then(data => {
    res.redirect(`/Applicant/${id}`);
    console.log('item updated ' + id);
  }).catch((error) => {
    console.log('error happend in the updated data...', error);
  });

}

function handleFeedback(req,res){
  res.render('feedback');
}


client.connect().then(() => {

  app.listen(PORT, () => {
    console.log(`app is listning on port${PORT}`);
  });

}).catch(error => {

  console.log('Error In Connection DB', error);
});

