
const { statusMiddleware } = require("../Middlewares/statusMiddleware");
const { StoryModel } = require("./story.models");


// create new story

exports.createStory = async (req, res, next) => {
    const { title, text } = req.body;
    try {
        const story = await StoryModel.create({
            title,
            content: [{ text, author: req.user.username, authorId: req.user._id }],
            createdBy: req.user._id,
            contributors: [req.user._id]
        });
        res.status(201).json({message:"Story created successfully",story});
    } catch (error) {
        next(error);
    }
};


// get all stories
exports.getStories = async (req, res, next) => {
    try {
        const stories = await StoryModel.find()
         .populate('content.authorId','username email')
         .populate('createdBy','username email')
        .populate('contributors', 'username email');
        res.status(201).success({"count":stories.length,"stories":stories},"All stories");
    } catch (error) {
        next(error);
    }
};


// get single story
exports.getStory = async (req, res, next) => {
    try {
        const story = await StoryModel.findById(req.params.id)
        .populate('createdBy', 'username')
        .populate('contributors','username')
        if (!story) {
            return statusMiddleware(404, 'Story not found')(req, res, next);
        }

        res.status(201).success({"contributors-count":story.contributors.length,"story":story},"Successfull");
        // res.json({"story":story})
        
    } catch (error) {
        next(error);
    }
};



// contribute the existing sory
exports.addContribution = async (req, res, next) => {
    const { text } = req.body;
    try {
        const story = await StoryModel.findById(req.params.id);
        if (!story) {
            return statusMiddleware(404, 'Story not found')(req, res, next);
        }
        if (!story.canContribute(req.user._id)) {
            return statusMiddleware(403, 'You cannot contribute to this story,Limit exceeded ')(req, res, next);
        }
        story.content.push({ text, author: req.user.username, authorId: req.user._id });
        story.contributors.push(req.user._id);
        await story.save()
        
        res.status(201).success({"Title":story.title,"contributed story ":story},"Successfully contribution done");
        // res.json(story);
    } catch (error) {
        next(error);
    }
};