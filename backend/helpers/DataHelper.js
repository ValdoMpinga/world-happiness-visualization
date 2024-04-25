const fs = require('fs');
const path = require('path');
const DataFrame = require('dataframe-js').DataFrame;
const ExcelJS = require('exceljs');
const { YEARS } = require('../helpers/constants');

const dataDirectory = path.join(__dirname, '../data/');

class DataHelper
{
    worldHappinessData_2015 = null
    worldHappinessData_2016 = null
    worldHappinessData_2017 = null
    worldHappinessData_2018 = null
    worldHappinessData_2018 = null
    worldHappinessData_2018 = null

    constructor()
    {
        this.dataDirectory = path.join(__dirname, '../data/');
    }

    /**
     * Retrieves all the existing files of each year.
     * 
     * @returns {Array} Array containing all the existing file names.
     */
    getFileNames()
    {
        try
        {
            // Read files in data directory
            const files = fs.readdirSync(dataDirectory);
            // Filter files with .csv extension
            const csvFiles = files.filter(file => file.endsWith('.csv'));
            return csvFiles;
        } catch (error)
        {
            console.error('Error reading data directory:', error);
            return [];
        }
    }

    /**
     * Retrieves data for happiness score.
     * 
     * @param {number} year The year for which data is requested.
     * @returns {Object} Object containing the label 'Country' and the value 'Happiness Score'.
     */
    async getHappinessScoreData(YEAR)
    {
        let fileName = `worldHappiness${YEAR}.csv`;
        let filePath = path.join(this.dataDirectory, fileName);
        await processYearData(filePath)
    }

}

async function processYearData(filePath)
{
    try
    {
        if (!fs.existsSync(filePath))
        {
            console.error(`File does not exist.`);
            return null;
        }

        // Read the CSV file into the DataFrame
        const df = new DataFrame(await DataFrame.fromCSV(filePath));

        const data = df.toArray(); // Convert DataFrame to array of arrays

        // Map each row to an object with 'label' and 'value' properties
        const formattedData = data.map(row => ({
            label: row[0], // Country
            value: row[2] // Happiness Score
        }));

        console.log(formattedData);
    } catch (error)
    {
        console.error(`Error reading file ${fileName}:`, error);
        // return null; 
    }
}



module.exports = DataHelper;
