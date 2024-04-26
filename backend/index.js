const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000;
const DataHelper = require('./helpers/DataHelper');

const dataHelper = new DataHelper()

app.use(cors()); 


app.get('/test', (req, res) =>
{
    res.json("Yo");
});

app.get('/bar-chart-data', async (req, res) =>
{
    const year = req.query.year;
    let data = await dataHelper.getHappinessScoreByCountry(year)
    res.send(data)
});



app.get('/scatter-chart-data', async (req, res) =>
{
    const year = req.query.year;

    let data = await dataHelper.getGPDvsHappinessScore(year)
    res.send(data)

});



app.get('/line-chart-data', async (req, res) =>
{
    let data = await dataHelper.getHappinessOverYearsData()
    res.send(data)

});

app.get('/stacked-chart-data', async (req, res) =>
{
    const year = req.query.year;

    let data = await dataHelper.getStackedBarChartData(year)
    res.send(data)

});

app.get('/bubble-chart-data', async (req, res) =>
{
    const year = req.query.year;

    let data = await dataHelper.getSocialSupportVsFreedomData(year)
    res.send(data)
});



app.listen(PORT, () =>
{
    console.log(`Server is running on http://localhost:${PORT}`);
});
