const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app build folder
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Healthcheck or root
app.get('/health', (req, res) => res.send('OK: TrademarkRadar is running ✅'));

// All other requests return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
