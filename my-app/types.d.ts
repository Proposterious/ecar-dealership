interface CustomUser extends mongoose.Document {
    username: {
      type: String,
      unique: true,
      required: false
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: any;
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: any,
      immutable: true
    }
  }