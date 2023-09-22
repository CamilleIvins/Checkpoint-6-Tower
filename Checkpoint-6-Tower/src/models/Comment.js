import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    body: { type: String, required: true },
    isAttending: { type: Boolean, required: true, default: true },

},
    { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',  //same as lecture, but if not working, try '_id'
    ref: 'Event',
    justOne: true
})