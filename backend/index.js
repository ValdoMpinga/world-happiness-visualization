const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const DataHelper = require('./helpers/DataHelper');

const dataHelper = new DataHelper()

async function tester()
{
    
    await dataHelper.getHappinessScoreData(2015)
}
tester()

app.get('/test', (req, res) =>
{
    res.json("Yo");
});

app.get('/scatter-chart-data', (req, res) =>
{

});

app.get('/pie-chart-data', (req, res) =>
{

});

app.get('/bar-chart-data', (req, res) =>
{

});

app.get('/line-chart-data', (req, res) =>
{

});

app.get('/bubble-chart-data', (req, res) =>
{

});

app.get('/stacked-bar-chart-data', (req, res) =>
{

});

app.listen(PORT, () =>
{
    console.log(`Server is running on http://localhost:${PORT}`);
});
