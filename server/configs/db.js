import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            console.error("MONGODB_URI is not defined in the environment variables.");
            return;
        }

        const connectionOptions = {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000,        // 45 seconds
            maxPoolSize: 10,
            
            // The `keepAlive` option is not supported by the underlying driver
            // as a top-level connection option.
            // It is handled internally by Mongoose or through `keepAliveInitialDelayMS`.
            // Instead, we can use a more direct option that works with the driver.
            // However, a simpler and more reliable approach is to remove it
            // as it's often the default or handled by other options.
            // Let's remove the keepAlive and keepAliveInitialDelay for now
            // as they are causing the error.
        };
        
        // Listen for connection events
        mongoose.connection.on('connected', () => {
            console.log("MongoDB database connected successfully!");
        });
        
        mongoose.connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
        });

        // Use the connection options without the conflicting `keepAlive`
        await mongoose.connect(`${mongoURI}/quickblog`, connectionOptions);
        
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        // You might want to exit the process in a real-world scenario
        // process.exit(1);
    }
}

export default connectDB;