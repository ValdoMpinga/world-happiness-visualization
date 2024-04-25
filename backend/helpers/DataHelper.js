const fs = require('fs');
const path = require('path');
const DataFrame = require('dataframe-js').DataFrame;
const ExcelJS = require('exceljs');
const { ROW_INDICES } = require('../helpers/constants');

const dataDirectory = path.join(__dirname, '../data/');

class DataHelper
{

    constructor()
    {
        this.dataDirectory = path.join(__dirname, '../data/');
    }

    /**
     * Retrieves data for happiness score by country.
     * 
     * @param {number} year The year for which data is requested.
     * @returns {Object} Object containing the label 'Country' and the value 'Happiness Score'.
     */
    async getHappinessScoreByCountry(year)
    {
        let fileName = `worldHappiness${year}.csv`;
        let filePath = path.join(this.dataDirectory, fileName);
        await processYearData(filePath, ROW_INDICES.HappinessScore, ROW_INDICES.Country)
    }


    /**
   * Retrieves data for GDP vs happiness score scatter plot.
   * 
   * @param {number} year The year for which data is requested.
   * @returns {Object} Object containing the label 'GDP' and the value 'Happiness Score'.
   */
    async getGPDvsHappinessScore(year)
    {
        let fileName = `worldHappiness${year}.csv`;
        let filePath = path.join(this.dataDirectory, fileName);
        await processYearData(filePath, ROW_INDICES.GDPerCapita, ROW_INDICES.HappinessScore);

    }


    /**
     * Retrieves  for happiness over the years.
     * 
     * @param {number} year The year for which data is requested.
     * @returns {Object} Object containing the label 'Country' and the value 'Happiness Score'.
     */
    async getHappinessOverYearsData(year)
    {
        let fileName = `worldHappiness${year}.csv`;
        let filePath = path.join(this.dataDirectory, fileName);
        await processYearData(filePath, ROW_INDICES.Country, ROW_INDICES.HappinessScore);

    }



}

function getKeyByValue(object, value)
{
    return Object.keys(object).find(key => object[key] === value);
}

async function processYearData(filePath, row_one, row_two)
{
    try
    {
        if (!fs.existsSync(filePath))
        {
            console.error(`File does not exist.`);
            return null;
        }

        const df = new DataFrame(await DataFrame.fromCSV(filePath));

        const data = df.toArray();

        x_label = getKeyByValue(ROW_INDICES, row_one)
        y_label = getKeyByValue(ROW_INDICES, row_two)

        const formattedData = data.map(row => ({
            [x_label]: row[row_one],
            [y_label]: row[row_two]
        }));

        console.log(formattedData);
    } catch (error)
    {
        console.error(`Error reading file ${fileName}:`, error);
        // return null; 
    }
}


module.exports = DataHelper;
