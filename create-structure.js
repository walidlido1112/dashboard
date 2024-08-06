const fs = require('fs');
const path = require('path');

// Define the folder and file structure
const structure = {
  'src': {
    'components': [
      { name: 'Header.tsx', content: `
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Box as="header" p={4} bg="teal.500" color="white">
      <Heading size="lg">My Product App</Heading>
    </Box>
  );
};

export default Header;
      `},
      { name: 'Footer.tsx', content: `
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" p={4} bg="teal.500" color="white" textAlign="center">
      <Text>&copy; 2024 My Product App</Text>
    </Box>
  );
};

export default Footer;
      `},
      { name: 'ProductForm.tsx', content: `
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

const schema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be positive'),
});

type FormData = z.infer<typeof schema>;

const ProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>Product Name</FormLabel>
        <Input {...register('name')} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.price}>
        <FormLabel>Price</FormLabel>
        <Input type="number" {...register('price')} />
        <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" mt={4}>Submit</Button>
    </form>
  );
};

export default ProductForm;
      `},
      { name: 'ProductList.tsx', content: `
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Box, List, ListItem, Spinner, Text } from '@chakra-ui/react';

const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

const ProductList: React.FC = () => {
  const { data, error, isLoading } = useQuery('products', fetchProducts);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">Error fetching products</Text>;

  return (
    <List spacing={3}>
      {data.map((product: any) => (
        <ListItem key={product.id}>{product.name} - ${product.price}</ListItem>
      ))}
    </List>
  );
};

export default ProductList;
      `}
    ],
    'pages': [
      { name: 'Home.tsx', content: `
import React from 'react';
import ProductList from '../components/ProductList';
import { Box } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Box p={4}>
      <h1>Product List</h1>
      <ProductList />
    </Box>
  );
};

export default Home;
      `},
      { name: 'Features.tsx', content: `
import React from 'react';
import { Box } from '@chakra-ui/react';

const Features: React.FC = () => {
  return (
    <Box p={4}>
      <h1>Features</h1>
      <p>Details about features...</p>
    </Box>
  );
};

export default Features;
      `},
      { name: 'Download.tsx', content: `
import React from 'react';
import { Box } from '@chakra-ui/react';

const Download: React.FC = () => {
  return (
    <Box p={4}>
      <h1>Download</h1>
      <p>Download information...</p>
    </Box>
  );
};

export default Download;
      `}
    ],
    'react-query-config.ts': `
import { QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default queryClient;
    `,
    'chakra-theme.ts': `
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    teal: {
      500: '#38b2ac',
    },
  },
});

export default theme;
    `,
    'App.tsx': `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Download from './pages/Download';
import { ChakraProvider } from '@chakra-ui/react';
import queryClient from './react-query-config';
import { QueryClientProvider } from 'react-query';
import theme from './chakra-theme';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/download" element={<Download />} />
          </Routes>
          <Footer />
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
    `,
    'index.tsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
    `
  },
  'public': [
    { name: 'index.html', content: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Product App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
    `}
  ],
  '.gitignore': `
node_modules
dist
.env
    `,
  'package.json': `
{
  "name": "my-product-app",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-hook-form": "^7.15.0",
    "zod": "^3.11.6",
    "react-query": "^3.34.12",
    "axios": "^0.24.0",
    "@chakra-ui/react": "^1.6.6",
    "@emotion/react": "^11.4.1",
    "@emotion/styled": "^11.3.0",
    "jspdf": "^2.4.0",
    "react-router-dom": "^6.2.1"
  },
  "devDependencies": {
    "typescript": "^4.4.3",
    "vite": "^2.5.10",
    "@vitejs/plugin-react": "^1.0.8"
  }
}
    `,
  'tsconfig.json': `
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
    `,
  'vite.config.ts': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});
    `
};

// Function to create files and folders
const createStructure = (baseDir, structure) => {
  for (const [key, value] of Object.entries(structure)) {
    const fullPath = path.join(baseDir, key);

    if (typeof value === 'object' && !Array.isArray(value)) {
      // Create a directory
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      // Recursively create subdirectories and files
      createStructure(fullPath, value);
    } else if (Array.isArray(value)) {
      // Create files in the directory
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      value.forEach(file => {
        fs.writeFileSync(path.join(fullPath, file.name), file.content);
      });
    } else {
      // Create a file
      fs.writeFileSync(fullPath, value);
    }
  }
};

// Create the project structure in the current directory
createStructure('.', structure);

console.log('Project structure created successfully.');
