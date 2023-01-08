const fs = require('fs/promises'); // node core module - using for reading xml file and saving output file
const parseString = require('xml2js').parseString; // npm package - using to convert xml data to JSON
const json2xls = require('json2xls'); // npm package - using for converting JSON to XLSX

const INPUT_FILE = './compiler.xml'; // full path to input file with extenstion name
const OUTPUT_FILE_NAME = './output.xlsx'; // full path and name of the output file with extension

// main function
async function main() {
  try {
    // reading the input file
    const data = await fs.readFile(INPUT_FILE, { encoding: 'utf8' });
    // array to hold json data
    const jsonTextArray = [];
    // attempting to convert file file to JSON
    parseString(data, function (err, result) {
      // loop to push each book into the array
      for (let i = 0; i < result.catalog.book.length; i++) {
        jsonTextArray.push({
          Book_Id: result.catalog.book[i]['$'].id,
          Author: result.catalog.book[i].author[0],
          Title: result.catalog.book[i].title[0],
          Genre: result.catalog.book[i].genre[0],
          Price: result.catalog.book[i].price[0],
          Publish_Date: result.catalog.book[i].publish_date[0],
          Description: result.catalog.book[i].description[0],
        });
      }
    });
    // converting json data to xls
    const xls = json2xls(jsonTextArray);
    // saving output file
    fs.writeFile(OUTPUT_FILE_NAME, xls, 'binary');
  } catch (err) {
    console.log(err);
  }
}

// call main function
main();
