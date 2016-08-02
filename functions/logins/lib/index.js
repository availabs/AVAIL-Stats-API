var Client = require('pg').Client;

module.exports.respond = function(event,context,cb){

  var config = {
    host: 'mars.availabs.org',
    user: 'postgres',
    password: 'Jedi21funk',
    database: 'AVAILstats',
  };

  var intervalLength = event.interval - 1;

  var client = new Client(config);
  client.connect();
  var query = client.query(
    "SELECT dt.series, COUNT(timestamp)\
    FROM login_stats \
    RIGHT OUTER JOIN (\
      SELECT \
      GENERATE_SERIES( (NOW() - INTERVAL '"+intervalLength+" day')::date, NOW()::date, '1 day')::date\
      AS series\
    ) AS dt \
    on date_trunc('day', timestamp) = dt.series\
    GROUP BY dt.series\
    ORDER BY dt.series ASC", 
    function(err, result) {
    cb(null,result.rows);

    client.end(function (err) {
      if (err) throw err;
    });
  });
}

//TO DEPLOY NEW FUNCTION
//sls function deploy
