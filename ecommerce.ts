
export interface Category {
  id: number | string;
  name: string;
}

export interface Product {
  id: number | string;
  name: string;
  price: number;
  category: Category;
}


export type Role = "ADMIN" | "CUSTOMER";

export class User {
  id: number | string;
  username: string;
  email: string;
  role: Role;

  constructor(id: number | string, username: string, email: string, role: Role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role; 
  }
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];

 
  addItem(product: Product, quantity: number): void {
    const itemExists = this.items.some(item => item.product.id === product.id);

    if (itemExists) {
     
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      }
    } else {
    
      this.items.push({ product, quantity });
    }
  }

 
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

 
  getFinalPrice(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  
  getItems(): CartItem[] {
    return this.items;
  }
}
