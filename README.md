# Getting Started with the App

This is a sample dummy App to run sql queries

## Steps to run the App

In the app root directory, you run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Noteworthy points
-- This is a serverless dummy app
-- Only select queries are allowed to run (UI should not allow update, delete, drop statements to run as they could lead to security concerns)
-- The available table names are 'categories','customers', 'employee_territories','employees','order_details', 'orders','products','regions','shippers','suppliers' and 'territories'
-- Queries will always display all the columns irrespective of columns selected in the select query
-- Although multiple queries separated by semicolon(;) are allowed, the data will be displayed from the first query only

## Demo Application

-- https://unrivaled-lokum-ffd110.netlify.app/
