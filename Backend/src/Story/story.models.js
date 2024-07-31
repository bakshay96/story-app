const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},{
    timestamps:true
});

const StorySchema = new mongoose.Schema({
    title: { type: String, required: true, unique:true },
    content: [ContributionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    maxContributions: { type: Number, default: 10 }
},{
    timestamps:true
});

StorySchema.methods.canContribute = function (userId) {
    const contributionsByUser = this.content.filter(contribution => contribution.authorId.toString() === userId.toString()).length;
    return contributionsByUser === 0 && this.content.length < this.maxContributions;
};

const StoryModel = mongoose.model('Story', StorySchema);

module.exports={
    StoryModel
}
