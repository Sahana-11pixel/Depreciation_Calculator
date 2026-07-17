const express = require("express");
const app = express();

//get the input from user
app.post('api/Depreciation_Calculator ', (req, res) => {
  const { cost, salvageValue, year } = req.body;
  // write validations

  if (savageValue < cost) return res.send(req.body(cost, savageValue, year))
  else
    return error("Savage value should be less than asset cost");
  if (year < 0) return res.send(req.body(cost, savageValue, year))
});

// use the formula to calculate depreciation - stright line method
//- yearlyDepreciation = (costOfAsset - salvageValue) / duration
const depreciated_value = (cost - savageValue) / year;

//return the depreciation value in clean json structure

res.send(depreciated_value)
app.listen(3000);
const port = process.env.port || 3000;