import { Product } from "../../types/product";

const products: Product[] = [{
	sku: "123",
	title: "Apple Iphone 7",
	description: "Lorem ipsum dot color...",
	price: 800,
	stock: 10
},
{
	sku: "321",
	title: "Samsung Galaxy 7",
	description: "Lorem ipsum dot color...",
	price: 699,
	stock: 17
}
];

const useProducts = () => {
	return products
};

export default useProducts;
