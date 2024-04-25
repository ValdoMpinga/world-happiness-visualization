const fs = require('fs');
const path = require('path');
const DataFrame = require('dataframe-js').DataFrame;
const ExcelJS = require('exceljs');

async function readExcelToDataFrame(filePath)
{
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    const rows = [];
    worksheet.eachRow((row, rowNumber) =>
    {
        if (rowNumber !== 1)
        {
            // Skip header row
            rows.push(row.values.slice(1)); // Skip first cell (assuming first column is not needed)
        }
    });

    // Extract headers from the first row
    const headers = worksheet.getRow(1).values.slice(1); // Skip first cell (assuming first column is not needed)

    // Create DataFrame
    return new DataFrame(rows, headers);
}

async function groupDataByYearAndWriteToFile(filePath, outputDir)
{
    console.log('Current directory:', __dirname);

    const dataDirectory = path.join(__dirname, '../data/');
    if (fs.existsSync(dataDirectory))
    {
        console.log('Directory exists:', dataDirectory);

        const df = await readExcelToDataFrame(filePath);

        const groupedData = df.groupBy('Year');

        // Convert groupedData to an array of DataFrames
        const dataFrames = await groupedData.toCollection();

        console.log(dataFrames.length);

        // Iterate over DataFrames and write to separate CSV files
        for (let i = 0; i < dataFrames.length; i++)
        {
            // Get the underlying DataFrame object from the grouped DataFrame
            const df = dataFrames[i].group;

            // Get the year from the groupKey property
            const year = dataFrames[i].groupKey.Year;

            const yearFileName = path.join(outputDir, `worldHappiness${year}.csv`);
            console.log(yearFileName);

            fs.writeFileSync(yearFileName, df.toCSV()); // Write CSV data to file
            console.log(`Data for year ${year} has been written to ${yearFileName}`);
        }
    } else
    {
        console.log('Data directory does not exist:', dataDirectory);
    }
}

const inputFilePath = path.join(__dirname, '../data/worldHappinessDataset.xlsx');
const outputDirectory = path.join(__dirname, '../data/');

groupDataByYearAndWriteToFile(inputFilePath, outputDirectory);
