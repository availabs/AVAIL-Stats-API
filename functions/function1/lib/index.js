var Client = require('pg').Client;

module.exports.respond = function(event,context,cb){

  var config = {
    host: 'mars.availabs.org',
    user: 'postgres',
    password: 'Jedi21funk',
    database: 'AVAILstats',
  };


  var client = new Client(config);
  client.connect();
  var query = client.query('Select * from login_stats', function(err, result) {

    var userCount = {}

    var applicationCount = {};

    result.rows.forEach(row => {
      if(!userCount[row.user]){
        userCount[row.user] = 0;
      }
      userCount[row.user] = userCount[row.user] + 1;

      if(!applicationCount[row.application]){
        applicationCount[row.application] = 0;
      }
      applicationCount[row.application] = applicationCount[row.application] + 1;      
    })


    cb(null,[userCount,applicationCount,result.rows[result.rows.length-1].timestamp]);

    client.end(function (err) {
      if (err) throw err;
    });
  });
}

//TO DEPLOY NEW FUNCTION
//sls function deploy
