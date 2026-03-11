import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const mongodbUri = process.env.MONGODB_URI;
  
  // Debug logging
  if (!mongodbUri) {
    console.warn('[WARNING] MONGODB_URI environment variable is not set. Using localhost fallback.');
    console.warn('[WARNING] Available env vars:', Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('mongo')));
  } else {
    console.log('[INFO] MongoDB URI configured from environment variable');
  }

  return {
    uri: mongodbUri || 'mongodb://localhost:27017/pulso',
  };
});
