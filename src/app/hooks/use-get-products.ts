"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { ProductService } from "../services/product.service";
import { IProduct } from "../interfaces/iproduct";

const useGetProducts = () => {
  const [productsItems, setProductsItems] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productsService = useMemo(() => new ProductService(), []);

  const fetchProducts = useCallback(
    async (searchQuery: string = "") => {
      setLoading(true);
      setError(null);

      try {
        const productsList = searchQuery
          ? await productsService.getProductsByName(searchQuery)
          : await productsService.getAllProducts();
        setProductsItems(productsList);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [productsService]
  );

  const deleteProduct = useCallback(
    async (trackingId: number) => {
      try {
        const updatedProducts = await productsService.removeProductByTrackingId(
          trackingId
        );
        setProductsItems(updatedProducts);
      } catch (error: any) {
        setError(error.message);
      }
    },
    [productsService]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { productsItems, loading, error, fetchProducts, deleteProduct };
};

export default useGetProducts;
