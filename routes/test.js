const { Client } = require('pg')
const client = new Client({
  connectionString:  'postgres://ewkwwdospfkzrs:9f7a354cf12a7838654c76b65eb6d50a0e29f694eca62809130101b80aefef21@ec2-54-145-224-156.compute-1.amazonaws.com:5432/d3ovbobr7hg356',
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();
client.query(`insert into testcases (problem_code , no_tests ) values ( '0606B' , 2)`, (err, res) => {
  console.log(err, res) ;
  client.end() ;
});