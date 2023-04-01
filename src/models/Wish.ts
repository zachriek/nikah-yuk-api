import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const WishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Wish = mongoose.model('Wish', WishSchema);

export default Wish;
