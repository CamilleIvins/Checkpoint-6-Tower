import { Schema } from "mongoose";

export const EventSchema = new Schema({
    name: { type: String, required: true, maxLength: 25 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    location: { type: String, required: true, maxLength: 100 },
    coverImg: { type: String, required: true, maxLength: 500 },
    description: { type: String, required: true, maxLength: 500 },
    startDate: { type: Date, required: true, maxLength: 50 },
    capacity: { type: Number, required: true, maxLength: 25 },
    isCancelled: { type: Boolean, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], lowercase: true },
},
    { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: 'capacity',
    foreignField: 'event', //NOTE will need to double check this
    ref: 'Ticket',
    justOne: true
})