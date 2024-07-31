
const { statusMiddleware } = require("../Middlewares/statusMiddleware");
const { StoryModel } = require("./story.models");


// //create new story

// exports.createStory = async (req, res) => {
//     const { title, text } = req.body;
//     //console.log("boddy",title,text)
    
//     try {
//         const story = await StoryModel.create({
//             title,
//             content: [{ text, author: req.user.username, authorId: req.user._id }],
//             createdBy: req.user._id,
//             contributors: [req.user._id]
//         });
        
//         res.status(201).success(story,"Story created successfully");
//     } catch (err) {
//         // return statusMiddleware(500, 'Error creating story')(req, res, next);
//         next(err);
        
//     }
// };

// // get all stories

// exports.getStories = async (req, res) => {
//     try {
//         const stories = await StoryModel.find();

//         res.status(201).success(stories,"All stories");
//     }  catch (err) {
//         // return statusMiddleware(500, 'Error fetching stories')(req, res, next);
//         next(err);
//     }
// };


// //get SingleS
// exports.getStory = async (req, res) => {
//     try {
//         const story = await StoryModel.findById(req.params.id).populate('createdBy', 'username');
//         if (!story) {
//             return statusMiddleware(404, 'Story not found')(req, res, next);
//         }
//         res.json(story);
//     } catch (error) {
//         next(error);
//     }
// };

// exports.addContribution = async (req, res) => {
//     const { text } = req.body;
//     try {
//         const story = await StoryModel.findById(req.params.id);
//         if (!story) {
//             // return statusMiddleware(404, 'Story not found')(req, res, next);
//             res.fail("Story not found",404);
//         }
//         if (!story.canContribute(req.user._id)) {
//             // return statusMiddleware(403, 'You cannot contribute to this story')(req, res, next);
//             res.fail('You cannot contribute to this story',403)
//         }
//         story.content.push({ text, author: req.user.username, authorId: req.user._id });
//         story.contributors.push(req.user._id);
//         await story.save();
//         res.json(story);

//     } catch (err) {
//         // return statusMiddleware(500, 'Error adding contribution')(req, res, next);
//         next(err)
//     }
// };


exports.createStory = async (req, res, next) => {
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
        next(error);
    }
};

exports.getStories = async (req, res, next) => {
    try {
        const stories = await StoryModel.find();
        res.json({"stories":stories});
    } catch (error) {
        next(error);
    }
};

exports.getStory = async (req, res, next) => {
    try {
        const story = await StoryModel.findById(req.params.id).populate('createdBy', 'username');
        if (!story) {
            return statusMiddleware(404, 'Story not found')(req, res, next);
        }
        res.json(story);
    } catch (error) {
        next(error);
    }
};

exports.addContribution = async (req, res, next) => {
    const { text } = req.body;
    try {
        const story = await StoryModel.findById(req.params.id);
        if (!story) {
            return statusMiddleware(404, 'Story not found')(req, res, next);
        }
        if (!story.canContribute(req.user._id)) {
            return statusMiddleware(403, 'You cannot contribute to this story,Limit Excced')(req, res, next);
        }
        story.content.push({ text, author: req.user.username, authorId: req.user._id });
        story.contributors.push(req.user._id);
        await story.save();
        res.json(story);
    } catch (error) {
        next(error);
    }
};