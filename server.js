var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");
var app = express();

let PORT = process.env.PORT || 3001;
dotenv.config();
const Info = require("./Schema/Info");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var mongoDB = process.env.MONGO_CONNECTION;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("[MONGO] Connected");
  }
);

app.get("/test", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/insert", (request, response) => {
  let globalInfo = new Info();
  const requestDate = request.body.date;
  Info.find({ date: requestDate }, (err, info) => {
    if (err) {
      response.status(500).send({
        error: "There was an error in your request",
      });
    }
    if (info.length === 0) {
      globalInfo.date = request.body.date;
      globalInfo.breakfast = request.body.breakfast;
      globalInfo.lunch = request.body.lunch;
      globalInfo.dinner = request.body.dinner;
      globalInfo.snacks = request.body.snacks;
      globalInfo.drinks = request.body.drinks;
      globalInfo.headache = request.body.headache;
      globalInfo.save((err, savedInfo) => {
        if (err) {
          response.status(500).send({
            error: "Could not save information",
          });
        } else {
          response.status(200).send({
            savedInfo,
          });
        }
      });
    } else {
      response.status(500).send({
        error: "You have already submitted an entry today",
      });
    }
  });
});

app.get("/log", (req, res) => {
  Info.find({}, (err, info) => {
    if (err) {
      res.status(500).send({
        error: "Could not fetch entire log",
      });
    } else {
      res.status(200).send({ info });
    }
  });
});

app.get("/find-date/:id", (request, response) => {
  let specific_date = request.params.id;
  if (specific_date.length !== 8) {
    response.status(500).send({
      error: "Date is not in correct format",
    });
  }
  let month = specific_date.slice(0, 2);
  let day = specific_date.slice(2, 4);
  let year = specific_date.slice(4, 8);
  let parsedDate = `${month}/${day}/${year}`;
  Info.find({ date: parsedDate }, (err, info) => {
    if (err) {
      response.status(500).send({
        error: `Could not fetch log entry for ${parsedDate}`,
      });
    }
    if (info.length == 0) {
      response.status(500).send({
        error: `Nothing was submitted to the log on ${parsedDate}`,
      });
    } else {
      response.send(info);
    }
  });
});

app.get("/find-breakfast/:id", (request, response) => {
  let specific_breakfast = request.params.id;
  Info.find({ breakfast: specific_breakfast }, (err, info) => {
    if (err) {
      response.status(500).send({
        error: `Could not fetch any entries with breakfast ${specific_breakfast}`,
      });
    }
    if (info.length == 0) {
      response.status(500).send({
        error: `No results in log for ${specific_breakfast} as a breakfast entry`,
      });
    } else {
      response.send(info);
    }
  });
});

app.get("/find-lunch/:id", (request, response) => {
  let specific_lunch = request.params.id;
  Info.find({ lunch: specific_lunch }, (err, info) => {
    if (err) {
      response.status(500).send({
        error: `Could not fetch any entries with lunch ${specific_lunch}`,
      });
    }
    if (info.length == 0) {
      response.status(500).send({
        error: `No results in log for ${specific_lunch} as a lunch entry`,
      });
    } else {
      response.send(info);
    }
  });
});

app.get("/find-dinner/:id", (request, response) => {
  let specific_dinner = request.params.id;
  Info.find({ dinner: specific_dinner }, (err, info) => {
    if (err) {
      response.status(500).send({
        error: `Could not fetch any entries with dinner ${specific_dinner}`,
      });
    }
    if (info.length == 0) {
      response.status(500).send({
        error: `No results in log for ${specific_dinner} as a dinner entry`,
      });
    } else {
      response.send(info);
    }
  });
});

app.get("/find-snacks/:id", (request, response) => {
  let specific_snacks = request.params.id;
  Info.find({ snacks: specific_snacks }, (err, info) => {
    if (err) {
      response.status(500).send({
        error: `Could not fetch any entries with snacks ${specific_snacks}`,
      });
    }
    if (info.length == 0) {
      response.status(500).send({
        error: `No results in log for ${specific_snacks} as a snacks entry`,
      });
    } else {
      response.send(info);
    }
  });
});

app.get("/find-drinks/:id", (request, response) => {
  let specific_drinks = request.params.id;
  Info.find({ drinks: specific_drinks }, (err, info) => {
    if (err) {
      response.status(500).send({
        error: `Could not fetch any entries with drinks ${specific_drinks}`,
      });
    }
    if (info.length == 0) {
      response.status(500).send({
        error: `No results in log for ${specific_drinks} as a drinks entry`,
      });
    } else {
      response.send(info);
    }
  });
});

// GET route to find the entries that either contain or do not contain a headache
app.get("/find-headache/:id", (req, res) => {
  let hadHeadache = req.params.id;
  if (hadHeadache === "yes") {
    Info.find({ headache: true }, (err, info) => {
      try {
        res.json(info);
      } catch (err) {
        res.json({ error: "No entries with headaches found" });
      }
    });
  } else if (hadHeadache === "no") {
    Info.find({ headache: false }, (err, info) => {
      try {
        res.json(info);
      } catch (err) {
        res.json({ error: "No entries without headache found" });
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Server] Port: ${PORT}`);
});
