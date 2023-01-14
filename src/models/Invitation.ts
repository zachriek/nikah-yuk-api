import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const InvitationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    groom: {
      name: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      fatherName: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    bride: {
      name: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      fatherName: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    date: {
      ceremony: {
        type: String,
        required: true,
      },
      reception: {
        type: String,
        required: true,
      },
    },
    messages: [
      {
        name: String,
        body: String,
      },
    ],
    galleries: [
      {
        public_id: String,
        url: String,
      },
    ],
    music: String,
  },
  { timestamps: true }
);

const Invitation = mongoose.model('Invitation', InvitationSchema);

export default Invitation;
