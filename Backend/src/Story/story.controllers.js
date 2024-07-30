const { statusMiddleware } = require("../Middlewares/statusMiddleware");
const { StoryModel } = require("./story.models");


exports.createStory = async (req, res) => {
    const { title, text } = req.body;
    try {
        const story = await StoryModel.create({
            title,
            content: [{ text, author: req.user.username, authorId: req.user._id }],
            createdBy: req.user._id,
            contributors: [req.user._id]
        });
        res.status(201).json(story);
    } catch (error) {
        return statusMiddleware(500, 'Error creating story')(req, res, next);
        
    }
};

exports.getStories = async (req, res) => {
    try {
        const stories = await StoryModel.find();
        res.json(stories);
    }  catch (error) {
        return statusMiddleware(500, 'Error fetching stories')(req, res, next);
    }
};

exports.getStory = async (req, res) => {
    try {
        const story = await StoryModel.findById(req.params.id).populate('createdBy', 'username');
        if (!story) {
            return statusMiddleware(404, 'Story not found')(req, res, next);
        }
        res.json(story);

    } catch (error) {
        return statusMiddleware(500, 'Error fetching story')(req, res, next);
    }
};

exports.addContribution = async (req, res) => {
    const { text } = req.body;
    try {
        const story = await StoryModel.findById(req.params.id);
        if (!story) {
            return statusMiddleware(404, 'Story not found')(req, res, next);
        }
        if (!story.canContribute(req.user._id)) {
            return statusMiddleware(403, 'You cannot contribute to this story')(req, res, next);
        }
        story.content.push({ text, author: req.user.username, authorId: req.user._id });
        story.contributors.push(req.user._id);
        await story.save();
        res.json(story);

    } catch (error) {
        return statusMiddleware(500, 'Error adding contribution')(req, res, next);
    }
};
