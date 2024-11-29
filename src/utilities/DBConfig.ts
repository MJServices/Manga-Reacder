"use server"

import mongoose from 'mongoose';

export async function connect() {
    try {
        console.log("MongoDB URI:", process.env.MONGODB_URI!);

        await mongoose.connect(process.env.MONGODB_URI!, {
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        }).then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
        console.log("working in db 1");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err:any) => {
            console.error('MongoDB connection error:', err);
            process.exit(1); // Exit the process on connection error
        });

        connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw new Error('Database connection failed');
    }
}
