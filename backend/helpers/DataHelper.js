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
     * Retrieves all the existing files of each year.
     * 
     * @returns {Array} Array containing all the existing file names.
     */
    getFileNames()
    {
        try
        {
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
     * Retrieves data for happiness score by country.
     * 
     * @param {number} year The year for which data is requested.
     * @returns {Object} Object containing the label 'Country' and the value 'Happiness Score'.
     */
    async getHappinessScoreByCountry(year)
    {
        let fileName = `worldHappiness${year}.csv`;
        let filePath = path.join(this.dataDirectory, fileName);
        let data = await processYearData(filePath, ROW_INDICES.HappinessScore, ROW_INDICES.Country)
        console.log(data);
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
        let data = await processYearData(filePath, ROW_INDICES.GDPerCapita, ROW_INDICES.HappinessScore);
        console.log(data);

    }


    /**
     * Retrieves  for happiness over the years.
     * 
     * @param {number} year The year for which data is requested.
     * @returns {Object} Object containing the label 'Country' and the value 'Happiness Score'.
     */
    async getHappinessOverYearsData()
    {
        const happinessByCountry = {}; // Object to store happiness scores by country
        let totalWeightedSum = 0;
        let totalWeight = 0;

        const filesArray = this.getFileNames();

        for (const fileName of filesArray)
        {
            const filePath = path.join(this.dataDirectory, fileName);
            const year = parseInt(fileName.match(/\d+/)[0]); // Extract year from filename
            const happinessScoreColumn = ROW_INDICES.HappinessScore;
            const GDPPerCapitaColumn = ROW_INDICES.GDPerCapita;

            const happinessData = await processYearData(filePath, happinessScoreColumn, GDPPerCapitaColumn);

            happinessData.forEach((row)=> {
                row.HappinessScore = parseFloat(row.HappinessScore)
                row.GDPerCapita = parseFloat(row.GDPerCapita)

            })

            let weightedSum = 0;
            let totalGDP = 0;
            happinessData.forEach(entry =>
            {

                const happinessScore = parseFloat(entry.HappinessScore);
                const GDPPerCapita = parseFloat(entry.GDPerCapita);

                if (!isNaN(happinessScore) && !isNaN(GDPPerCapita))
                {
                    weightedSum += happinessScore * GDPPerCapita;
                    totalGDP += GDPPerCapita;
                }
            });


            totalWeightedSum += weightedSum;
            totalWeight += totalGDP; 

            happinessByCountry[year] = weightedSum / totalGDP;
        }

        const generalWorldHappinessScore = totalWeightedSum / totalWeight;

        console.log( {
            generalWorldHappinessScore,
            happinessByCountry
        });

        return {
            generalWorldHappinessScore,
            happinessByCountry
        }
    }

    /**
 * Retrieves stacked bar chart data for the specified year.
 * 
 * @param {number} year The year for which data is requested.
 * @returns {Object[]} Array of objects containing stacked bar chart data for each country.
 */

    async getStackedBarChartData(year)
    {
        const fileName = `worldHappiness${year}.csv`;
        const filePath = path.join(this.dataDirectory, fileName);
        const rowIndices = [
            ROW_INDICES.Country,
            ROW_INDICES.HappinessScore,
            ROW_INDICES.GDPerCapita,
            ROW_INDICES.SocialSupport,
            ROW_INDICES.HealthyLife,
            ROW_INDICES.Freedom,
            ROW_INDICES.Generosity,
            ROW_INDICES.Corruption
        ];
        const data = await processStackedBarData(filePath, rowIndices)

        // console.log(data);
        const groupedData = {};
        data.forEach(row =>
        {
            const country = row.Country;
            if (!groupedData[country])
            {
                groupedData[country] = {
                    Country: country,
                    HappinessScore: 0,
                    GDPerCapita: 0,
                    SocialSupport: 0,
                    HealthyLife: 0,
                    Freedom: 0,
                    Generosity: 0,
                    Corruption: 0
                };
            }
            Object.keys(row).forEach(key =>
            {
                if (key !== 'Country')
                {
                    groupedData[country][key] += parseFloat(row[key]);
                }
            });
        });

        const stackedBarChartData = Object.values(groupedData);

        console.log(stackedBarChartData);
        return stackedBarChartData;
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

        return formattedData;
    } catch (error)
    {
        console.error(`Error reading file ${filePath}:`, error);
    }
}

async function processStackedBarData(filePath, rowIndices)
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

        const formattedData = data.map(row =>
        {
            const formattedRow = {};
            rowIndices.forEach(rowIndex =>
            {
                const label = getKeyByValue(ROW_INDICES, rowIndex);
                if (rowIndex === ROW_INDICES.Country)
                {
                    formattedRow[label] = row[rowIndex]; // Country should remain as string
                } else
                {
                    formattedRow[label] = parseFloat(row[rowIndex]);
                }
            });
            return formattedRow;
        });

        return formattedData;
    } catch (error)
    {
        console.error(`Error reading file ${filePath}:`, error);
    }
}



module.exports = DataHelper;
