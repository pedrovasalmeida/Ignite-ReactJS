export interface IFood {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export interface IEditingFood {
  id?: number;
  name?: string;
  description?: string;
  price?: string;
  available?: boolean;
  image?: string;
}
