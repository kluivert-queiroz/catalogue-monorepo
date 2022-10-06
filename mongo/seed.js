print("Start ######");
conn = new Mongo();
db = conn.getDB("app");
db.createCollection("products");
db.products.insertMany([
  {
    title: "Apple Iphone X",
    description: "Great phone",
    price: 899,
    stock: 10,
  },
  {
    title: "Apple Iphone 7",
    description: "Good phone",
    price: 699,
    stock: 25,
  },
  {
    title: "Samsung Edge 7",
    description: "Not that good phone",
    price: 399,
    stock: 55,
  },
]);
