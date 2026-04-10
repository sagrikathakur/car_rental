import "dotenv/config";
import * as User from './models/user.js';
import * as Car from './models/car.js';
import bcrypt from 'bcrypt';

const seed = async () => {
  try {
    console.log('Seeding database with sample data...');

    // 1. Create a sample owner
    const email = 'owner@example.com';
    const existingUser = await User.findByEmail(email);
    
    let ownerId;
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const newUser = await User.create({
        name: 'John Owner',
        email: email,
        password: hashedPassword,
        role: 'owner',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      });
      ownerId = newUser.id;
      console.log('Sample owner created.');
    } else {
      ownerId = existingUser.id;
      // Ensure role is owner
      await User.updateRole(ownerId, 'owner');
      console.log('Sample owner already exists.');
    }

    // 2. Add sample cars
    const sampleCars = [
      {
        owner_id: ownerId,
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        color: 'White',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop',
        category: 'Electric',
        fuel_type: 'Electric',
        transmission: 'Automatic',
        seats: 5,
        description: 'A sleek, high-performance electric sedan with advanced autopilot features.',
        price_per_day: 150
      },
      {
        owner_id: ownerId,
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        color: 'Black',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop',
        category: 'SUV',
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        seats: 5,
        description: 'Luxurious and spacious SUV, perfect for family trips and long drives.',
        price_per_day: 200
      }
    ];

    for (const car of sampleCars) {
      await Car.create(car);
    }
    console.log('Sample cars added.');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seed();
