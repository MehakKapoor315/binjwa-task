require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
const Insight = require('./models/Insight');
const Property = require('./models/Property');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for seeding...');

    // 1. Create Admin User
    const adminExists = await User.findOne({ email: 'admin@cbre.com' });
    if (!adminExists) {
      await User.create({
        email: 'admin@cbre.com',
        password: 'password123'
      });
      console.log('Admin user created: admin@cbre.com / password123');
    }

    // 2. Create Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        { title: 'Advisory & Transaction', description: 'Occupier and investor services for office, industrial, and retail.', icon: '🏢' },
        { title: 'Capital Markets', description: 'Investment sales, debt and structured finance, and investment banking.', icon: '💰' },
        { title: 'Asset Services', description: 'Property management, building technical services, and accounting.', icon: '🛠️' }
      ]);
      console.log('Services seeded.');
    }

    // 3. Create Insights
    const insightCount = await Insight.countDocuments();
    if (insightCount === 0) {
      await Insight.insertMany([
        { title: '2024 Global Real Estate Outlook', category: 'Global Research', content: 'Explore the key trends shaping the real estate landscape in 2024.' },
        { title: 'The Future of Workplace', category: 'Insights', content: 'How hybrid work is redefining office demand and design.' }
      ]);
      console.log('Insights seeded.');
    }

    console.log('Seeding complete!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
