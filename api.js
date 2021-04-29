const express = require("express");

const connection = require("./db");

const router = express.Router();

const shopQuery = {
  CREATE: `
        CREATE TABLE Shop(
            shop_id INTEGER AUTO_INCREMENT PRIMARY KEY,
            shop_name VARCHAR(50),
            shop_owner VARCHAR(30),
            shop_contact VARCHAR(15),
            shop_address VARCHAR(250)
        );
    `,
  INSERT: `
        INSERT INTO Shop(shop_name, shop_owner, shop_contact, shop_address) VALUES(?, ?, ?, ?);
    `,
  GET: `SELECT * FROM Shop;`,
  GETBYID: `SELECT * FROM Shop WHERE shop_id = ?;`,
  DELETEBYID: `DELETE FROM Shop WHERE shop_id=?;`,
  UPDATE: `
    UPDATE Shop SET 
      shop_name=?,
      shop_owner=?,
      shop_contact=?,
      shop_address=?
    WHERE shop_id = ?;  
  `,
};

/*
connection.query(shopQuery.CREATE, (err, rows, fields) => {
  if (err) throw err;
  console.log("Result Rows: ", rows, fields);
  console.log("Result Fields: ", fields);
});
*/
/*
//middleware-> Middleware is a function that executes for every request before the request handler. Middleware must be declared before all the endpoints.
router.use((req, res, next) => {
  console.log(`Request received on ${req.url}`);
  next();
});
*/

router.use(express.json()); //express.json() is a middle ware which reads every request and scans for the values in body and adds those values to the request object as the key body

router.get("/", (req, res) => {
  res.send("Welcome to the demo REST api");
});

//create a new record for shop
router.post("/shop", (req, res) => {
  //Object destructuring

  const { shop_name, shop_owner, shop_contact, shop_address } = req.body;
  /* const shop_name = req.body.shop_name;
  const shop_owner = req.body.shop_owner;
  const shop_contact = req.body.shop_contact;
  const shop_address = req.body.shop_address;*/
  /*
  if (!shop_name || !shop_owner || !shop_contact || !shop_address) {
    console.log("Data is missing");
    //res.status(400).send("Data is missing");
    res.status(400).json({ error: "Data is missing" });
    return;
  }
  */
  if (!shop_name) {
    console.log("Data is missing");
    //res.status(400).send("Data is missing");
    return res.status(400).json({ error: "'shop_name' is missing" });
  }
  if (!shop_owner) {
    console.log("Data is missing");
    //res.status(400).send("Data is missing");
    return res.status(400).json({ error: "'shop_owner' is missing" });
  }
  if (!shop_contact) {
    console.log("Data is missing");
    //res.status(400).send("Data is missing");
    return res.status(400).json({ error: "'shop_contact' is missing" });
  }
  if (!shop_address) {
    console.log("Data is missing");
    //res.status(400).send("Data is missing");
    return res.status(400).json({ error: "'shop_address' is missing" });
  }

  console.log("Request body: ", req.body);

  connection.query(
    shopQuery.INSERT,
    [shop_name, shop_owner, shop_contact, shop_address],
    (err, rows, fields) => {
      if (err) throw err;

      let obj = {
        shop_id: rows.insertId,
        shop_name,
        shop_owner,
        shop_contact,
        shop_address,
      };
      console.log("Rows:", rows);
      console.log("Fields:", fields);
      //res.status(201).send("Data Inserted");
      res.status(201).json(obj);
    }
  );
});

router.get("/shop", (req, res) => {
  connection.query(shopQuery.GET, (err, rows, fields) => {
    if (err) throw err;
    console.log("Rows:", rows);
    console.log("Fields:", fields);
    res.status(200).json(rows);
  });
});

router.get("/shop/:id", (req, res) => {
  const id = req.params.id;
  connection.query(shopQuery.GETBYID, [id], (err, rows, fields) => {
    if (err) throw err;
    console.log("Rows:", rows);
    console.log("Fields:", fields);
    if (rows.length !== 0) res.json(rows[0]);
    else res.status(404).json({ error: `Record with id ${id} not found` });
  });
});

router.delete("/shop/:id", (req, res) => {
  const id = req.params.id;
  connection.query(shopQuery.DELETEBYID, [id], (err, rows, fields) => {
    if (err) throw err;
    console.log("Rows:", rows);
    console.log("Fields:", fields);
    if (rows.affectedRows !== 0)
      res.json({ msg: `Record with id ${id} deleted` });
    else res.status(404).json({ error: `Record with id ${id} not found` });
  });
});

router.put("/shop/:id", (req, res) => {
  const shop_id = req.params.id;
  const { shop_name, shop_owner, shop_contact, shop_address } = req.body;
  if (!shop_name)
    return res.status(400).json({ error: "'shop_name' is missing" });
  if (!shop_owner)
    return res.status(400).json({ error: "'shop_owner' is missing" });
  if (!shop_contact)
    return res.status(400).json({ error: "'shop_contact' is missing" });
  if (!shop_address)
    return res.status(400).json({ error: "'shop_address' is missing" });

  connection.query(
    shopQuery.UPDATE,
    [shop_name, shop_owner, shop_contact, shop_address, shop_id],
    (err, rows, fields) => {
      if (err) throw err;
      console.log("Rows:", rows);
      console.log("Fields:", fields);
      if (rows.affectedRows !== 0)
        res
          .status(200)
          .json({ shop_id, shop_name, shop_owner, shop_contact, shop_address });
      else
        res
          .status(404)
          .json({ error: `Record with id ${shop_id} could not be updated` });
    }
  );
});
module.exports = router;
