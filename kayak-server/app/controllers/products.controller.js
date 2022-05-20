const db = require('../index');


// exports.getRouteById = (req, res) => {
//     // 'parse' (pick apart) the request for any data
//     let id = req.params.id
    

//     // create an SQL script for the database (as a string)
//     const query = `
//     SELECT id, url 
//     FROM urls.urls 
//         WHERE id = ?;
//     `;
//    const placeholders = [id];
//     // tell the database to execute that script
//     db.query(query, placeholders, (err, results) => {
//         // this code will execute when the DB responds 
//         // return appropriate response to the client

//         // 3 possible cases
//         // 1 - success
//         // 2 - 404 nothing found
//         // 3 - whole error

//         if (err) {
//             // case #3
//             res.status(500)
//                 .send({
//                     message: "There was an error finding route.",
//                     error: err
//                 })
//         } else if (results.length == 0) {
//             //case # 2
//             res.status(404)
//                 .send({
//                     message: "no route found"
//                 })
//         } else {
//             // case # 1
//             res.send({
//                 url: results[0]
//             });
//         }
//     });
// }

// exports.getAllUrls = (req, res) => {
//     // 'parse' (pick apart) the request for any data
    

//     // create an SQL script for the database (as a string)
//     const query = `
//     SELECT * FROM urls.urls ;
//     `;
  
//     // tell the database to execute that script
//     db.query(query, (err, results) => {
//         // this code will execute when the DB responds 
//         // return appropriate response to the client

//         // 3 possible cases
//         // 1 - success
//         // 2 - 404 nothing found
//         // 3 - whole error

//         if (err) {
//             // case #3
//             res.status(500)
//                 .send({
//                     message: "There was an error getting all URLs.",
//                     error: err
//                 })
//         } else if (results.length == 0) {
//             //case # 2
//             res.status(404)
//                 .send({
//                     message: "no URLs found"
//                 })
//         } else {
//             // case # 1
//             res.send({
//                 urls: results
//             });
//         }
//     });
// }

// exports.createNewRoute = (req, res) => {

//     console.log(req.body);

//     let { id, url  } = req.body;

//     if (!id || !url) {
//         res.status(400)
//             .send({
//                 message: " Could not create route. You must provide a valid 'URL'."
//             });
//         return;
//     }

//     const query = `
//             INSERT INTO urls.urls (id, url) 
//             VALUES 
//                 (?, ?);
//     `;
//     const placeholders = [id, url];

//     // tell the database to execute that script
//     db.query(query, placeholders, (err, results) => {

//         console.log(results);

//         if (err) {
//             // case #3
//             res.status(500)
//                 .send({
//                     message: "There was an error creating a new route.",
//                     error: err
//                 });
//         } else {
//             // case # 1
//             res.send({
//                 message: 'your route was created successfully.'
//             });
//         }
//     });

// }
