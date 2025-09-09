import mongoose from 'mongoose';

const URLSchema = new mongoose.Schema({
    urlCode: {type:String},
    longUrl: {type:String},
    shortUrl: {type:String},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Url = mongoose.model('Url', URLSchema);

export default Url;