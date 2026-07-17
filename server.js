const express = require("express");
const app = express();
app.use(express.json());

//get the input from user
app.post('/api/calculate_asset_depreciation ', (req, res) => {
  const { cost, salvageValue, year } = req.body;
  // write validations

  if (savageValue >= cost) return res.status(400).json({ error: "Salvage value must be less than asset cost" });
  if (year <= 0) return res.status(400).json({ error: "Duration must be greater than 0" });

  // use the formula to calculate depreciation - stright line method
  //- yearlyDepreciation = (costOfAsset - salvageValue) / duration
  const depreciated_value = (cost - savageValue) / year;

  //return the depreciation value in clean json structure

  res.send(depreciated_value)
  const port = process.env.port || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));