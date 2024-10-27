import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const userId = req.id;
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        const user = await User.findById(userId);
        const bookmarkedJobIds = user.bookmarkedJobs.map(id => id.toString());

        const jobsWithBookmarkStatus = jobs.map(job => ({
            ...job.toObject(),
            isBookmarked: bookmarkedJobIds.includes(job._id.toString())
        }));

        return res.status(200).json({
            jobs: jobsWithBookmarkStatus,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const toggleBookmark = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        const bookmarkIndex = user.bookmarkedJobs.indexOf(jobId);

        if (bookmarkIndex === -1) {
            // Job is not bookmarked, so add it
            user.bookmarkedJobs.push(jobId);
            await user.save();
            res.status(200).json({ bookmarked: true, message: "Job bookmarked successfully", success: true });
        } else {
            // Job is already bookmarked, so remove it
            user.bookmarkedJobs.splice(bookmarkIndex, 1);
            await user.save();
            res.status(200).json({ bookmarked: false, message: "Job removed from bookmarks", success: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getBookmarkedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({
            path: 'bookmarkedJobs',
            populate: {
                path: 'company',
                select: 'name logo'
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ bookmarkedJobs: user.bookmarkedJobs, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
