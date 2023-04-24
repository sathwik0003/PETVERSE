document.getElementById("product-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    // Get form values
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var image = document.getElementById("image").files[0].name; // Store only the filename
  
    // Create new product object
    var product = new Product({
      title: title,
      description: description,
      price: price,
    //   image: image
    });
  
    try {
      // Save the product object to the database
      const result = await product.save();
      console.log(`Inserted product with id ${result._id}`);
    } catch (err) {
      console.error(err);
    }
  });