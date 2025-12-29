import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// Load .env.local file, overriding .env variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });
