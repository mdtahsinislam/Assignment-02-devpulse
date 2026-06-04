// import app from "./app";

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});