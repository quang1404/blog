module.exports = {
    mongooseToObject: (mongoose) => mongoose ? mongoose.toObject() : mongoose,
    multipleMongooseToObject: (mongooses) => mongooses.map(mongoose => mongoose.toObject()),
};
