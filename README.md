
# XE Currency Converter API

A Node.js API that provides currency conversion rates and historical currency data by scraping [XE.com](https://www.xe.com/).

## Features

- Real-time currency conversion between any supported currencies
- Historical currency rate lookup by date
- Simple RESTful API endpoints
- CORS enabled for cross-origin requests

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/xe-currency-api.git
   cd xe-currency-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

The server will run on port 8080, 8000, or the port specified in your environment variables.

## API Endpoints

### Live Currency Conversion

```
GET /:FROM/:TO/:AMT
```

- `FROM`: 3-letter currency code to convert from (e.g., USD)
- `TO`: 3-letter currency code to convert to (e.g., EUR)
- `AMT`: Amount to convert (e.g., 100)

**Example:**
```
GET /USD/EUR/100
```
Returns the converted amount as a string.

### Historical Currency Rates

```
GET /hist/:CURR/:YEAR/:MONTH/:DAY
```

- `CURR`: Base currency code (e.g., USD)
- `YEAR`: Year (e.g., 2023)
- `MONTH`: Month (1-12)
- `DAY`: Day (1-31)

**Example:**
```
GET /hist/USD/2023/01/15
```
Returns an array of objects containing:
- `CurrCode`: Currency code
- `UnitPer`: Units per base currency
- `PerUnit`: Base currency units per this currency

### API Status Check

```
GET /api
```
Returns a simple status message.

## Usage Examples

### JavaScript Fetch Example
```javascript
// Live conversion
fetch('http://localhost:8080/USD/EUR/100')
  .then(response => response.text())
  .then(data => console.log(data));

// Historical rates
fetch('http://localhost:8080/hist/USD/2023/01/15')
  .then(response => response.json())
  .then(data => console.log(data));
```

### cURL Example
```bash
curl http://localhost:8080/USD/EUR/100
curl http://localhost:8080/hist/USD/2023/01/15
```

## Configuration

The server can be configured with the following environment variables:

- `PORT`: Port to run the server on (default: 8080 or 8000)

## Dependencies

- [Express](https://expressjs.com/) - Web framework
- [Axios](https://axios-http.com/) - HTTP client
- [Cheerio](https://cheerio.js.org/) - HTML parsing
- [CORS](https://github.com/expressjs/cors) - Cross-origin resource sharing

## Installing Dependencies

### 1. First, initialize your Node.js project (if you haven't already):
```bash
npm init -y
```

### 2. Install all required dependencies:
```bash
npm install express axios cors cheerio
```

This will install:
- `express` - Web framework for Node.js
- `axios` - Promise-based HTTP client
- `cors` - Middleware for enabling CORS
- `cheerio` - jQuery implementation for server-side HTML parsing

### Alternative: Install each dependency individually

If you prefer to install them one by one:

```bash
npm install express
npm install axios
npm install cors
npm install cheerio
```

### Development Dependencies (optional)

If you want to add development dependencies like nodemon for automatic server restarts:

```bash
npm install --save-dev nodemon
```

Then add this to your `package.json` under "scripts":
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Now you can run the server in development mode with:
```bash
npm run dev
```

### Verifying Installation

After installation, check your `package.json` file to ensure all dependencies are listed under the "dependencies" section. It should look something like this:

```json
"dependencies": {
  "axios": "^1.6.7",
  "cheerio": "^1.0.0-rc.12",
  "cors": "^2.8.5",
  "express": "^4.18.2"
}
```

Note: The version numbers might be different as packages get updated.

### Important Notes:
1. Make sure you have Node.js and npm installed on your system first
2. All these packages will be installed locally in your project's `node_modules` folder
3. The `{ response }` from express is part of the Express package, so you don't need to install it separately

## License

This project is open source and available under the [MIT License](LICENSE.md).

## Disclaimer

This API scrapes data from XE.com. Please use responsibly and consider their terms of service. The maintainers of this project are not responsible for any misuse.
```

You may want to customize:
1. The repository URL in the Installation section
2. The example domain/port in Usage Examples
3. Add any additional configuration options
4. Add deployment instructions if applicable
5. Add contribution guidelines if open source

The README provides clear installation instructions, API documentation, usage examples, and covers all the main features of your application.