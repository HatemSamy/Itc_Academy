
import GroupModel from '../../../../DB/model/Group.model.js';
import SessionModel from '../../../../DB/model/session.model.js';
import { asynchandlier } from '../../../services/erroeHandling.js';

export const CreateSession = asynchandlier(async (req, res, next) => {
    const { title, date, time } = req.body;
    const CreatedBy = req.user._id;
    const groupId = req.params.groupId


    // Check if the group exists
    const group = await GroupModel.findById(groupId);
    if (!group) {
        return next(new Error("Group not found"))
    }

    const formattedTime = time;
    // Convert date string to Date object
    const formattedDate = new Date(date);

    // Create a new session instance
    const newSession = new SessionModel({
        title,
        date: formattedDate,
        time: formattedTime,
        CreatedBy,
        groupId
    });

    // Save the session to the database
    const savedSession = await newSession.save();
    if (!savedSession) {
        return next(new Error("Create session fialed"))

    }

    group.Sessions.push(savedSession._id);
    await group.save();

    res.status(201).json({ message: "Session created successfully", data: savedSession });

})


export const getNextSessionInGroup = asynchandlier(async (req, res, next) => {

    const groupId = req.params.groupId
    const userId = req.user._id; // Assuming userId is available in the request object after authentication

    const group = await GroupModel.findById(groupId);
    if (!group) {
        return res.status(404).json({ error: 'Group not found' });
    }

    const isInGroup = group.students.some(studentId => studentId.equals(userId)) || group.instructor.equals(userId) || (req.user.role = "Admin");
    if (!isInGroup) {
        return res.status(403).json({ error: 'You are not authorized to access this resource' });
    }

    // Query sessions belonging to the group and sort them by date in descending order
    const lastSession = await SessionModel.findOne({ groupId })
        .sort({ date: -1 }) // Sort sessions by date in descending order
        .exec();

    if (!lastSession) {
        return next(new Error('No sessions found for this group'));
    }

    res.status(200).json({ message: "The next session for this group:", data: lastSession });

});


export const deleteSessionFromGroup = asynchandlier(async (req, res) => {

    const { groupId, sessionId } = req.params;
    const group = await GroupModel.findById(groupId);
    if (!group) {
        return next(new Error("Group not found"))

    }
    const session = await SessionModel.findById(sessionId);
    if (!session || session.groupId.toString() !== groupId) {
        return next(new Error('Session not found in this group'))

    }
    // Remove session from the group's sessions array
    await GroupModel.findByIdAndUpdate(groupId, { $pull: { sessions: sessionId } });

    const removedSession = await SessionModel.findByIdAndDelete(sessionId);

    res.status(200).json({ message: "Session deleted successfully", removedSession });
})

export const getAllSessionInGroup = asynchandlier(async (req, res, next) => {

    const groupId = req.params.groupId
    const userId = req.user._id;

    const group = await GroupModel.findById(groupId);
    if (!group) {
        return res.status(404).json({ error: 'Group not found' });
    }

    const isInGroup = group.students.some(studentId => studentId.equals(userId)) || group.instructor.equals(userId) || (req.user.role = "Admin");
    if (!isInGroup) {
        return res.status(403).json({ error: 'You are not authorized to access this resource' });
    }

    const Sessions = await SessionModel.findOne({ groupId })

    if (!lastSession) {
        return next(new Error('No sessions found for this group'));
    }

    res.status(200).json({ message: "The next session for this group:", data: Sessions });

});