import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const findedProduct = cart.find((prod) => prod.id === productId);

      if (!findedProduct) {
        const { data: productData } = await api.get<Product>(
          `/products/${productId}`
        );

        if (!productData) {
          toast.error('Erro na adição do produto');
          return;
        }

        const { data: stockData } = await api.get<Stock>(`/stock/${productId}`);

        if (stockData.amount > 0) {
          const productToAdd = {
            ...productData,
            amount: 1,
          };

          setCart([...cart, productToAdd]);

          localStorage.setItem(
            '@RocketShoes:cart',
            JSON.stringify([...cart, productToAdd])
          );
          toast.success('Produto adicionado ao carrinho');
          return;
        }
      } else {
        updateProductAmount({
          productId,
          amount: findedProduct.amount + 1,
        });
      }
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const findedProduct = cart.find((prod) => prod.id === productId);

      if (!findedProduct) {
        toast.error('Erro na remoção do produto');
        return;
      }

      const cartWithoutProduct = cart.filter(
        (product) => product.id !== productId
      );

      setCart(cartWithoutProduct);

      localStorage.setItem(
        '@RocketShoes:cart',
        JSON.stringify(cartWithoutProduct)
      );

      toast.success('Produto removido com sucesso');
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        toast.error('Erro na alteração de quantidade do produto');
        return;
      }

      const findedProduct = cart.find((prod) => prod.id === productId);

      if (!findedProduct) {
        toast.error('Erro na alteração de quantidade do produto');
        return;
      }

      const { data: stockData } = await api.get<Stock>(`/stock/${productId}`);

      if (amount > stockData.amount) {
        toast.error('Quantidade solicitada fora de estoque');
      } else {
        const updatedCart = cart.map((prod) =>
          prod.id === productId ? { ...prod, amount } : prod
        );

        setCart(updatedCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
