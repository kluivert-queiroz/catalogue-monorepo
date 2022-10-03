import { CartItem } from "./product";

interface Cart {
	_id: string;
	items?: CartItem[]
}