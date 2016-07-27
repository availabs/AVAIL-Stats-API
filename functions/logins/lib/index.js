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
  var query = client.query("SELECT COUNT(*), date_part('day', timestamp) as day, date_part('month', timestamp) as month FROM login_stats WHERE timestamp > current_date - interval '30' day GROUP BY day,month ORDER BY month, day", function(err, result) {


    cb(null,result.rows);

    client.end(function (err) {
      if (err) throw err;
    });
  });
}

//TO DEPLOY NEW FUNCTION
//sls function deploy
