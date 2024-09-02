import products from "../moc/sample_dataset_final_update.json";
import { ProductParser } from "./products.parser";
import { IProduct } from "../interfaces/iproduct";
import { IRawProduct } from "../interfaces/iproduct";

export class ProductService {
  private productParser: ProductParser;
  private parsedProducts: IProduct[];

  constructor() {
    this.productParser = new ProductParser(products as IRawProduct[]);
    this.parsedProducts = [];
  }

  async parseProducts() {
    if (this.parsedProducts.length === 0) {
      this.parsedProducts = await this.productParser.parseAll();
    }
    return this.parsedProducts;
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await this.parseProducts();
  }

  async getProductsByName(name: string): Promise<IProduct[]> {
    const products = await this.parseProducts();
    const lowercaseName = name.toLowerCase();

    return products.filter((product) =>
      product.productName.toLowerCase().includes(lowercaseName)
    );
  }

  async removeProductByTrackingId(trackingId: number): Promise<IProduct[]> {
    this.parsedProducts = this.parsedProducts.filter(
      (product) => product.trackingId !== trackingId
    );
    return this.parsedProducts;
  }
}
