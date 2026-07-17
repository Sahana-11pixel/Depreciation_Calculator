const express = require("express");
const app = express();
app.use(express.json());

//get the input from user
app.post('/api/calculate_asset_depreciation', (req, res) => {
  const { costOfAsset, salvageValue, duration } = req.body;

  // 1. Check for missing fields
  if (costOfAsset === undefined || salvageValue === undefined || duration === undefined)
    return res.status(400).json({ error: "Missing required fields: costOfAsset, salvageValue, duration" });

  // 2. Check for empty string fields
  if (costOfAsset === "" || salvageValue === "" || duration === "")
    return res.status(400).json({ error: "Fields cannot be empty" });

  // 3. Check that all values are numbers (not strings like "abc")
  if (typeof costOfAsset !== "number" || typeof salvageValue !== "number" || typeof duration !== "number")
    return res.status(400).json({ error: "All fields must be numbers" });

  // 4. Check for negative or zero asset cost
  if (costOfAsset <= 0)
    return res.status(400).json({ error: "Cost of asset must be greater than 0" });

  // 5. Salvage value cannot be negative
  if (salvageValue < 0)
    return res.status(400).json({ error: "Salvage value cannot be negative" });

  // 6. Salvage value must be less than cost
  if (salvageValue >= costOfAsset)
    return res.status(400).json({ error: "Salvage value must be less than asset cost" });

  // 7. Duration must be a positive whole number
  if (duration <= 0 || !Number.isInteger(duration))
    return res.status(400).json({ error: "Duration must be a positive whole number" });

  // use the formula to calculate depreciation - stright line method
  //- yearlyDepreciation = (costOfAsset - salvageValue) / duration
  const depreciated_value = (costOfAsset - salvageValue) / duration;

  // return the depreciation value in clean json structure - yearly wise
  const schedule = [];
  for (let i = 1; i <= duration; i++) {
    schedule.push({
      year: i,
      depreciation: depreciated_value,
      remainingValue: costOfAsset - (depreciated_value * i)
    });
  }

  res.json({
    yearlyDepreciation: depreciated_value,
    schedule: schedule
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));