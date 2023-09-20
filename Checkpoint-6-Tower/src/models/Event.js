import { Schema } from "mongoose";

export const EventSchema = new Schema({
    name: { type: String, required: true, maxLength: 55 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    location: { type: String, required: true, maxLength: 100 },
    coverImg: { type: String, required: true, maxLength: 500 },
    description: { type: String, required: true, maxLength: 5000 },
    startDate: { type: Date, required: true, maxLength: 50 },
    capacity: { type: Number, required: true, maxLength: 25 },
    isCanceled: { type: Boolean, required: true, default: false },
    // if you set as a virtual, cannot have a literal here
    // ticketCount: { type: Number, required: true, maxLength: 5 },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], lowercase: true },
},
    { timestamps: true, toJSON: { virtuals: true } })
// in SERVICE will need to POPULATE w/ 'creator ticketCount' to get BOTH in
// also, they spelled isCancelled w/ one 'L', isCanceled
EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId', //NOTE will need to double check this
    ref: 'Ticket',
    count: true
})