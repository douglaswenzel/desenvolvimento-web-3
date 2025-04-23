import express, { Request, Response } from 'express';
import BrandRoutes from "./src/routes/brand.routes";

const app = express();
app.use("/brand", BrandRoutes)
app.use(express.json());

interface Fornecedor {
  id: number;
  cnpj: number;
  razao_social: string;
  cep: number;
  contato: string;
}

interface Estoque {
  id: string;
  id_produto: string;
  id_fornecedor: string;
  validade: string;
  lote: string;
  data_de_entrada: string;
  quantidade: number;
} 

interface Marca {
  id: string;
  description: string;
}

interface Produto {
  id: number;
  nome: string;
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
  document: string;
  zipCode: string;
  email: string;
  phone: string;
}

const clients: Cliente[] = [];


interface Venda {
  id: number;
  id_produto: number;
  id_cliente: number;
  id_funcionario: number;
  valor_venda: number;
  forma_pagamento: string;
  data_venda: Date;
  nf_venda: string;
}

interface VendaProduto {
  id: number;
  id_cliente: number;
  id_produto: number;
  id_venda: number;
  quantidade: number;
  preco: number;
}

const products: Produto[] = [
  {
    id: 1,
    nome: "Feijão Carioca",
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
    nome: "Arroz",
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

app.get("/clients", (req: Request, res: Response) => {
  const name = req.query.name as string;
  let result = clients;

  if (name) {
    result = result.filter(c => c.name.includes(name));
  }

  res.status(200).json(result);
});

app.get("/product", (req: Request, res: Response) => {
  const nome = req.query.nome as string;
  const order = req.query.order as string;

  let result = products;

  if (nome) {
    result = result.filter((product) => product.nome.includes(nome));
  }

  if (order === "asc") {
    result = result.sort((a, b) => a.price - b.price);
  } else if (order === "desc") {
    result = result.sort((a, b) => b.price - a.price);
  }

  res.status(200).json(result);
});


app.post("/product", (req: Request, res: Response) => {
  const product: Produto = req.body;
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

app.post("/client", (req: Request, res: Response) => {
  const client: Cliente = req.body;
  client.id = clients.length + 1;
  clients.push(client);
  res.status(201).json(client);
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server Works on ${port} port`);
});
