const express = require('express');
const app = express();

const PORT = 5000;

// Listen function mein parameters ki zarurat nahi hoti
app.listen(PORT, () => {
    console.log(`🚀 Server is running on: http://localhost:${PORT}`);
});