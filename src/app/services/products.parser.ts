import { IProduct, IRawProduct } from "../interfaces/iproduct";
import products from "../moc/sample_dataset_final_update.json";

// this class convert products keys from IRawProduct to IProduct interface

export class ProductParser {
  private products: IRawProduct[];

  constructor(products: IRawProduct[]) {
    this.products = products;
  }

  private toCamelCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  }

  private parseProduct(product: IRawProduct): IProduct {
    const parsedProduct = {} as IProduct;

    for (const key in product) {
      if (product.hasOwnProperty(key)) {
        const camelCaseKey = this.toCamelCase(key) as keyof IProduct;
        (parsedProduct[camelCaseKey] as any) =
          product[key as keyof IRawProduct];
      }
    }

    if (parsedProduct.date) {
      parsedProduct.date = new Date(parsedProduct.date);
    }

    return parsedProduct;
  }
  private async parseChunk(chunk: IRawProduct[]): Promise<IProduct[]> {
    return chunk.map((product) => this.parseProduct(product));
  }

  public async parseAll(chunkSize: number = 10): Promise<IProduct[]> {
    const chunks = [];

    for (let i = 0; i < this.products.length; i += chunkSize) {
      chunks.push(this.products.slice(i, i + chunkSize));
    }

    const parsedChunks = await Promise.all(
      chunks.map((chunk) => this.parseChunk(chunk))
    );

    return parsedChunks.flat();
  }
}

(async () => {
  const parser = new ProductParser(products as IRawProduct[]);
  const parsedProducts = await parser.parseAll(10);
})();
