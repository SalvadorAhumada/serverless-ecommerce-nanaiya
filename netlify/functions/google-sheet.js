const { google } = require('googleapis');

exports.handler = async () => {

  try {
    const sheets = google.sheets({ version: process.env.VERSION, auth: process.env.API_KEY });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SHEET_NAME}!${process.env.RANGE}`,
    });

    const products = res.data.values.reduce((accumulator, currentProduct, i) => {
      if (i === 0) return accumulator;
      accumulator.push({
        id: currentProduct[0],
        nombre: currentProduct[1],
        descripcion: currentProduct[2],
        precio: currentProduct[3],
        imagen: currentProduct[4],
        inventario: currentProduct[5]
      });
      return accumulator;
    }, []);
    return { statusCode: 200, body: JSON.stringify(products) }
  } catch (ex) {
    return { statusCode: 400, body: JSON.stringify(ex) }
  }
}