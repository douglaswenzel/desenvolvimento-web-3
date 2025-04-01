import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface Product {
  id: number;
  name: string;
  brand: string;
  barCode: string;
  supplier: string;
  stockId: number;
  price: number;
  weight: number;
  messUnity: string;
}

interface Cliente {
  id: number;
  name: string;
  email: string;
  phone: number;
  addres: string;
}

interface Fornecedor {
  id: number;
  cnpj: number;
  name: string; 
  cep: number;
  contato: string;
}

const fornecedores: Fornecedor[] = [
  {
    id: 1,
    cnpj: 12345678000199,
    name: "Distribuidora Alimentos SA",
    cep: 12345678,
    contato: "contato@distribuidora.com"
  },
  {
    id: 2,
    cnpj: 98765432000155,
    name: "Bebidas do Brasil Ltda",
    cep: 87654321,
    contato: "contato@bebidas.com"
  }
];

const products: Product[] = [
  {
    id: 1,
    name: "Feijão Carioca",
    brand: "Broto Legal",
    barCode: "1212343542321323",
    supplier: "Rede de distribuição",
    stockId: 98,
    price: 6.79,
    weight: 1,
    messUnity: 'kg'
  },
  {
    id: 2,
    name: "Arroz",
    brand: "Tio João",
    barCode: "212132324242321",
    supplier: "Rede de distribuição",
    stockId: 98,
    price: 29.99,
    weight: 5,
    messUnity: 'kg'
  }
];

app.get("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    res.status(404).json({ message: "Produto não encontrado" });
    return;
  }

  res.status(200).json(product);
});


app.post
app.get("/product", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const order = req.query.order as string;

  let result = products;

  if (name) {
    result = result.filter((product) => product.name.includes(name));
  }

  if (order === "asc") {
    result = result.sort((a, b) => a.price - b.price);
  } else if (order === "desc") {
    result = result.sort((a, b) => b.price - a.price);
  }

  res.status(200).json(result);
});

app.post("/product", (req: Request, res: Response) => {
  const product: Product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(201).json(product);
});

app.delete("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const index = products.findIndex((product) => product.id === Number(id));

  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.get("/fornecedor", (req: Request, res: Response) => {
  const name = req.query.name as string;
  
  let result = fornecedores;
  
  if (name) {
    result = result.filter(fornecedor => 
      fornecedor.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  res.status(200).json(result);
});

app.get("/fornecedor/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const fornecedor = fornecedores.find(f => f.id === id);
  
  if (!fornecedor) {
    return res.status(404).json({ message: "Fornecedor não encontrado" });
  }
  
  res.status(200).json(fornecedor);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server Works on ${port} port`);
});
