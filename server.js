require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { Client } = require('pg'); // PostgreSQL client
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure Neon DB connection using DATABASE_URL from .env
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Uses DATABASE_URL from .env
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to Neon DB
client.connect()
  .then(() => console.log('Connected to Neon DB'))
  .catch(err => console.error('Failed to connect to Neon DB:', err));

// Define the API route to handle user insertion
app.post('/api/user', async (req, res) => {
  const { name, email, clerkId } = req.body;

  if (!name || !email || !clerkId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const insertQuery = `
      INSERT INTO users (name, email, clerk_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await client.query(insertQuery, [name, email, clerkId]);

    // Respond with the newly created user data
    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
