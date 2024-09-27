const projects = require('../Models/projectSchema')

// add a new project
exports.addProject = async (req, res) => {
    console.log("Inside add project controller");
    const userId = req.payload;
    console.log("userId:-", userId)
    // request we are getting is form data
    // so it is not possible to directly access the data
    // we need to use multer module to deal with multipart/form data
    const projectImage = req.file.filename
    console.log("Image file name", projectImage)
    const { title, language, github, website, overview } = req.body;
    try {
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            res.status(409).json("Project already exist")
        }
        else {
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            })
            await newProject.save();
            res.status(200).json("Project uploaded successfully")
        }
    } catch (err) {
        res.status(401).json("Project upload failed", err)
    }
}
// 1) get any 3 project details for home page
exports.getHomeProject = async (req, res) => {
    console.log("inside get home project controller")
    try {
        const homeProject = await projects.find().limit(3);
        res.status(200).json(homeProject)
    }
    catch (err) {
        res.send(401).json("Request failed due to:", err)
    }
}
// 2) get all projects 
exports.getAllProject = async (req, res) => {
    try {
        const allProject = await projects.find();
        res.status(200).json(allProject)
    }
    catch (err) {
        res.send(401).json("Request failed due to:", err)
    }
}
// 3) gett all projects uploaded by that specific user
exports.getUserProject = async (req, res) => {
    userId = req.payload;
    try {
        const allUserProject = await projects.find({ userId: userId });
        res.status(200).json(allUserProject)
    }
    catch (err) {
        res.send(401).json("Request failed due to:", err)
    }
}

