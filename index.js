const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express(); 
app.use(bodyParser.json());

let patients = new Object(); 
patients["999991234"] = ["John", "Doe", "123-456-7891" ]
patients["888881234"] = ["Jensen", "Watkins", "123-732-9876" ]

let records = new Object();
records["999991234"] = "Status: Cold"
records["888881234"] = "Status: Cancer"


// This gets the patients medical records 

app.get("/records", (req, res) => {
    // Verify Existence
    if (records[req.headers.ssn] === undefined) {
        res.status(404).send({"msg" : "Patient not found."})
        return;
    }
    // Verify SSN matches First/Last name 
    
    if (req.headers.firstname == patients[req.headers.ssn][0] && req.headers.lastname == patients[req.headers.ssn][1]) {
        if (req.body.reasonforvisit === "medicalrecords") {
            // return medical records 
            res.status(200).send(records[req.headers.ssn]);
            return;



        }
        else {
            // return  error 
            res.status(501).send({"msg" : "Unable to complete this request at this time: " + req.body.reasonforvisit})
            return;
        }
    }
    else {
        res.status(401).send({"msg" : "First or last didn't match SSN"})
        return; 
    }
    // Return Desired record
    res.status(200).send({"msg": "HTTP GET - SUCCESS!"});
});

 
// Create a new patient


app.post("/", (req, res) => {
    // Create patient in database 
    patients[req.headers.ssn] = [req.headers.firstname, req.headers.lastname, req.headers.phone]
    res.status(200).send(patients)
});

// Updating existing patient information (Number)

app.put("/", (req, res) => {

     // Verify Existence
     
     if (records[req.headers.ssn] === undefined) {
        res.status(404).send({"msg" : "Patient not found."})
        return;
    }
    if (req.headers.firstname == patients[req.headers.ssn][0] && req.headers.lastname == patients[req.headers.ssn][1]) {
        // Update Phone number and return patient info 
        patients[req.header.ssn] = [req.headers.firstname, req.headers.lastname, req.body.phone]; 
        res.status(201).send(patients[req.headers.ssn]);
        return;


    }
    else {
        res.status(401).send({"msg" : "First or last didn't match SSN (Trying to update phone number)"})
        return; 
    }
    // Make sure 
    res.status(200).send({"msg": "HTTP PUT - SUCCESS!"}) 
});



// Delete patient record 

app.delete("/", (req, res) => {

    // Verify existence
    if (records[req.headers.ssn] === undefined) {
        res.status(404).send({"msg" : "Patient not found."})
        return;
    }
    // Verify SSN matches First/Last name 
    if (req.headers.firstname == patients[req.headers.ssn][0] && req.headers.lastname == patients[req.headers.ssn][1]) {
        // Delete patient and medical records from database

        delete patients[req.headers.ssn]
        delete records[req.headers.ssn]

        res.status(200).send(patients); 
        return;
    }
    else {
        res.status(401).send({"msg" : "First or last didn't match SSN"})
        return; 
    }
});

app.listen(3000); 




