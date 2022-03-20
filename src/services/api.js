export async function getCategories() {
  // Implemente aqui
  try {
    const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = await data.json();
    return categories;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  try {
    let data;
    if (!categoryId && query) {
      data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    } else if (categoryId.length > 0) {
      data = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    } else {
      throw new Error('parâmetros inválidos!');
    }

    const category = await data.json();
    return category;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getProductDetails(productId) {
  try {
    const data = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const details = await data.json();
    return details;
  } catch (err) {
    console.error(err.message);
  }
}
