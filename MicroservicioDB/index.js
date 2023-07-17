const server = require('./src/server');

const PORT = 8003;



server.listen(PORT, () => {
    console.log(`Server DB levntado en PORT: ${PORT}`);
});