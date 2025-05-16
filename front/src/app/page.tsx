import Button from "@/features/home/components/ButtonLanding";
import { Card } from "@/features/home/components/Card";
import { getProducts } from "@/services/products";

interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const getData = async (): Promise<{ products: IProduct[] }> => {
  try {
    const products = await getProducts();
    return { products };
  } catch (error) {
    console.error("Error en getData:", error);
    return { products: [] };
  }
};

export default async function Home() {
  const { products } = await getData();
  return (
    <main>
      <section className="container mx-auto p-4">
        <h1
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 
          to-purple-600 bg-clip-text text-transparent"
        >
          Productos Apple
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: IProduct) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Button />
    </main>
  );
}