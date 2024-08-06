const fs = require('fs');
const path = require('path');

// Define the structure
const structure = {
  'my-backend': {
    'config': ['db.js'],
    'controllers': ['authController.js', 'userController.js'],
    'models': ['User.js'],
    'routes': ['authRoutes.js', 'userRoutes.js'],
    'middleware': ['authMiddleware.js'],
    '.env': null,
    'server.js': null,
    'package.json': null,
  }
};

// Function to create files and directories
const createStructure = (basePath, structure) => {
  Object.keys(structure).forEach(key => {
    const fullPath = path.join(basePath, key);
    
    if (typeof structure[key] === 'object') {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      createStructure(fullPath, structure[key]);
    } else if (structure[key] === null) {
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '', 'utf8');
      }
    }
  });
};

// Create the structure
createStructure(__dirname, structure);

console.log('Project structure created successfully.');
