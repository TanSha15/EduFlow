import { StudyMaterial } from "../models/StudyMaterial.js";
import { User } from "../models/user.js";

export const getUserStats = async (req, res) => {
    try {
        const userId = req.id;


        const totalMaterials = await StudyMaterial.countDocuments({ userId });


        const statsByType = await StudyMaterial.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$type", count: { $sum: 1 } } }
        ]);


        const user = await User.findById(userId).select("name streak lastActivity");

        return res.status(200).json({
            success: true,
            stats: {
                totalMaterials,
                statsByType,
                streak: user.streak,
                lastActivity: user.lastActivity,
                name: user.name
            }
        });
    } catch (error) {
        console.error("Stats Error:", error);
        return res.status(500).json({ success: false, message: "Error fetching dashboard stats" });
    }
};