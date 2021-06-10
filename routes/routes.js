const express = require('express');
const router = express.Router();
const math=require('mathjs');

var {Client, Pool}= require('pg')
const connectionString = 'postgres://ewkwwdospfkzrs:9f7a354cf12a7838654c76b65eb6d50a0e29f694eca62809130101b80aefef21@ec2-54-145-224-156.compute-1.amazonaws.com:5432/d3ovbobr7hg356'


const getIO = (req,res,next) =>{
  


    const client = new Client({
        connectionString:  'postgres://ewkwwdospfkzrs:9f7a354cf12a7838654c76b65eb6d50a0e29f694eca62809130101b80aefef21@ec2-54-145-224-156.compute-1.amazonaws.com:5432/d3ovbobr7hg356',
        ssl: {
            rejectUnauthorized: false
        }
        });
    client.connect();
    const text='SELECT problem_code , no_tests from testcases where problem_code = $1';
    const values =[req.body.problem_code];
    //console.log(text,values);
    client.query(text,  values, (err, rs) => {
        if (err) {
            console.log(err.stack)
        } else {
            //console.log(rs.rows[0])
        }

        var fs = require("fs");
        var fileinput = [];
        var fileoutput = [];
        for (var i = 0; i < rs.rows[0].no_tests ; i++) {
            var fi = fs
              .readFileSync(
                `./client/public/InputFiles/${req.body.problem_code}/${i}.txt`
              )
              .toString();
            fileinput.push(fi);
            var fo = fs
              .readFileSync(
                `./client/public/OutputFiles/${req.body.problem_code}/${i}.txt`
              )
              .toString();
            fileoutput.push(fo);
          }
        res.status(200).json({
            body: {
                inputs : fileinput,
                outputs : fileoutput
            }
        });
    }); 
    
    
}
const GetSubmissions = (req,res,next) =>{

    const client = new Client({
        connectionString:  'postgres://ewkwwdospfkzrs:9f7a354cf12a7838654c76b65eb6d50a0e29f694eca62809130101b80aefef21@ec2-54-145-224-156.compute-1.amazonaws.com:5432/d3ovbobr7hg356',
        ssl: {
            rejectUnauthorized: false
        }
        });
    client.connect();
    const text='SELECT * from submissions';
    client.query(text,  (err, rs) => {
        if (err) {
            console.log(err.stack)
        } else {
            //console.log(rs.rows[0])
        }
        res.status(200).json({
            body: {
               submissions :  rs.rows
            }
        });
    }); 
}
const SubmitHistory = (req, res, next) => {

    const client = new Client({
    connectionString:  'postgres://ewkwwdospfkzrs:9f7a354cf12a7838654c76b65eb6d50a0e29f694eca62809130101b80aefef21@ec2-54-145-224-156.compute-1.amazonaws.com:5432/d3ovbobr7hg356',
    ssl: {
        rejectUnauthorized: false
    }
    });
    client.connect();
    const text = `INSERT INTO Submissions(username, source_code,language,problem_code, verdict ,created_on) VALUES($1, $2,$3,$4, $5 , current_timestamp at time zone 'asia/kolkata' ) RETURNING *`
    const values = [req.body.user,
     req.body.source_code,req.body.language,req.body.problem_code,req.body.verdict]
    // callback
    //console.log(text,values);
    client.query(text, values, (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        //console.log(res.rows[0])
        
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    }
})
    res.status(200).json({
        body: 'Code Submitted'
    });
};

router.post('/codesubmit', SubmitHistory);
router.get('/getsubmit',GetSubmissions);
router.post('/getIO',getIO);
module.exports = router;