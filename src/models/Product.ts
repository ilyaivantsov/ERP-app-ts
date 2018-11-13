import { model, Schema } from 'mongoose';

const priceSchema = new Schema({
    cost: Number,
    markup: Number,
});

const ProductSchema: Schema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        default: '',
        required: true,
    },
    category: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        validate: {
            validator: function (v) {
                return /^id\d\d*/.test(v);
            },
            message: props => `${props.value} is not a valid id!`
        },
        required: true,
        unique: true,
        trim: true,
    },
    price: { 
        type: priceSchema,
        required: true,
    },
    featuredImage: {
        type: String,
        default: '',
    },
    tax: {
        type: String,
        enum: ['type1','type2','type3'],
        default: 'type1',
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    check: {
        type: String,
        default: '',
    } // check for product. Type - checkSchema
});

export default model('Product', ProductSchema);