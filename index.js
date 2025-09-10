const PORT = process.env.PORT || 7677;
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cheerio = require("cheerio");
const { response } = require("express");

const app = express();

const xe = [
  {
    name: "XE",
    address: "https://www.xe.com/currencyconverter/convert/?Amount=",
    from: "&From=",
    to: "&To=",
  },
];
const xeh = [
  {
    name: "XE",
    address: "https://www.xe.com/currencytables/?from=",
    date: "&date=",
  },
];
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.get("/api", (req, res) => {
  res.json("ÖTEK XE APİ UPDATE");
});
app.options("/:FROM/:TO/:AMT", cors(corsOptions), (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    // res.end();
});
app.get("/:FROM/:TO/:AMT", (req, res) => {
  //   res.json(req.params);
  const FromReq = req.params.FROM;
  const ToReq = req.params.TO;
  const AmtReq = req.params.AMT;

  // res.json(xe[0].address + xe[0].from + FromReq + xe[0].to + ToReq);
  axios
    .get(xe[0].address + AmtReq + xe[0].from + FromReq + xe[0].to + ToReq)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const ratef = $("body")
        .find(
          "div#__next div.\\[grid-area\\:conversion\\][data-testid=conversion] > div:nth-child(1) > p:nth-child(2)"
        )
        .text();
      res.json(ratef.substring(0, ratef.indexOf(" ")));
      // res.end();
    });
});

const historyTable = [];
app.options("/hist/:CURR/:YEAR/:MONTH/:DAY", cors(corsOptions), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  // res.end();
});
app.get("/hist/:CURR/:YEAR/:MONTH/:DAY", (req, res) => {
  //   res.json(req.params);
  const CurrReq = req.params.CURR;
  const DateReq = req.params.YEAR + "-" + req.params.MONTH + "-" + req.params.DAY;
  axios
    .get(xeh[0].address + CurrReq + xeh[0].date + DateReq)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const hisTable = $(
        "body div#table-section > section > div:nth-child(3) > div > table"
      )
        .parent()
        .html();

      $(
        "body div#table-section > section > div:nth-child(3) > div > table > tbody > tr"
      ).each(function () {
        const CurrCode = $(this).find("th").text();
        const CurrName = $(this).find("td:nth-child(2)").text();
        const UnitPer = $(this).find("td:nth-child(3)").text();
        const PerUnit = $(this).find("td:nth-child(4)").text();
        historyTable.push({
          CurrCode,
          UnitPer,
          PerUnit,
        });
      });
      res.json(historyTable);
      setTimeout(() => {
        historyTable.splice(0)
      }, 3000);
      // res.end();
    });
  // res.json(xeh[0].address + CurrReq + xeh[0].date + DateReq);
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
