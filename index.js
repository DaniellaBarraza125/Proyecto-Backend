const express = require("express");
const app = express();
const PORT = 3002;
const cors = require("cors");
const { typeError } = require("./middleware/errors");

app.use(express.json());

app.use(cors());

app.use(express.static("uploads"));
app.use("/reviews", require("./routes/reviews"));
app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));

app.use(typeError);

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));
