var Client = require('pg').Client;

module.exports.respond = function(event,context,cb){

  var config = {
    host: 'mars.availabs.org',
    user: 'postgres',
    password: 'Jedi21funk',
    database: 'AVAILstats',
  };

  var lineInterval = event.lineInterval - 1;
  var timeSeriesInterval = event.timeSeriesInterval-1;

  var client = new Client(config);
  client.connect();
  var query = client.query(
    "SELECT\
        date_trunc('day',d1.series) AS series,\
        COUNT(DISTINCT d2.full_user) count\
    FROM\
    (\
    SELECT \
          GENERATE_SERIES( (NOW() - INTERVAL '"+timeSeriesInterval+" day')::date, NOW()::date, '1 day')::date\
      as series\
    ) d1 \
    LEFT OUTER JOIN \
    (\
        SELECT DISTINCT\
            date_trunc('day', timestamp) AS series,\
      (\"user\", ip, user_agent) as full_user\
        FROM\
            login_stats\
    ) d2\
    ON d2.series BETWEEN d1.series - INTERVAL '"+lineInterval+" day' AND d1.series\
    GROUP BY\
        d1.series\
    ORDER BY\
        d1.series ASC", 
    function(err, result) {
    cb(null,result.rows);

    client.end(function (err) {
      if (err) throw err;
    });
  });
}

//TO DEPLOY NEW FUNCTION
//sls function deploy

