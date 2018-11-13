import { model, Schema } from 'mongoose';

const infoSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    default:'http://example.ru/ava.jpg',
    validate: {
      validator: function (v) {
        return /(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?(\w+.(jpg|png|gif))/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  access: {
    type: Boolean,
    default: false,    // false - fs system; true - bs system
  },
});

const UserSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  info: {
    type: infoSchema,
    required: true,
  },
  username: {
    type: String,
    default: '',
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    default: '',
    required: true,
  },
  password: {
    type: String,
    default: '',
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

export default model('User', UserSchema);