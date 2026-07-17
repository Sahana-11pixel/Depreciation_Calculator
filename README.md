# Depreciation Calculator API

A simple backend API built with Node.js and Express to calculate asset depreciation year by year using the Straight-Line method.

---

## What it does
You give it three things — the cost of the asset, how much it'll be worth at the end (salvage value), and how many years you're depreciating it over. It gives back a year-by-year breakdown of how[...]

---

## Tech Stack

- Node.js
- Express.js

---

## Formula Used

Straight-Line Depreciation — the simplest and most common method. Depreciation is equal every year.

```
Yearly Depreciation = (Cost of Asset - Salvage Value) / Duration
```

 I Kept it simple on purpose. No reducing balance, no complex methods — straight line does the job cleanly.

---

## Input Validations

The API checks for the following before doing any calculation:

- Any of the three fields are missing from the request
- Fields sent as empty strings
- Values that aren't numbers (like passing "abc" instead of a number)
- Asset cost is zero or negative
- Salvage value is negative
- Salvage value is greater than or equal to the asset cost (that doesn't make sense)
- Duration is zero, negative, or a decimal (has to be a whole number of years)

If any of these fail, you get a 400 error with a message explaining exactly what's wrong.


## Prerequisites

You only need **Node.js** installed on your system. The setup steps below will automatically download Express and everything else.

## How to Run

1. Clone the repo
2. Go into the project directory:
   ```
   cd Depreciation_Calculator
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
   Server runs on port 3000 by default.


This is a backend-only project. No frontend, no UI — just an API you can hit with any tool like Postman or cURL.
---

## API Endpoint

**POST** `/api/calculate_asset_depreciation`

**Request Body (JSON):**

```json
{
  "costOfAsset": 100000,
  "salvageValue": 10000,
  "duration": 5
}
```

- `costOfAsset` — what you paid for the asset
- `salvageValue` — what it'll be worth after the useful life ends
- `duration` — number of years

**Sample Response:**

```json
{
    "totalDepreciation": 90000,
    "yearlyDepreciation": 18000,
    "schedule": [
        {
            "year": 1,
            "depreciation": 18000,
            "remainingValue": 82000
        },
        {
            "year": 2,
            "depreciation": 18000,
            "remainingValue": 64000
        },
        {
            "year": 3,
            "depreciation": 18000,
            "remainingValue": 46000
        },
        {
            "year": 4,
            "depreciation": 18000,
            "remainingValue": 28000
        },
        {
            "year": 5,
            "depreciation": 18000,
            "remainingValue": 10000
        }
    ]
}
```

---


- This is backend only — there's no UI. Use Postman or cURL to test it.
- If you pass a very large number for duration (like 10000 years), the API will generate that many records in the response. It'll still work but the response will be large and may take a moment. [...]
- All three fields are required. Sending partial data won't work.

---

This project was undertaken as part of a formal recruitment evaluation.
