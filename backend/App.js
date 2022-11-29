const express = require('express');
const port = 4000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/todos', require('./routes/todosRoutes'));
 


app.listen(port, console.log(`Server started on port ${port}`))