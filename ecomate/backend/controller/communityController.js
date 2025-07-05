// backend/controllers/communityController.js

const Community = require('../models/Community');
const Challenge = require('../models/Challenge');
const Contribution = require('../models/ChallengeContribution');

exports.predictImpact = async (req, res) => {
  try {
    const communityId = req.params.communityId;

    // ✅ 1. Populate members with valid user info
    const community = await Community.findById(communityId).populate('members', 'name');
    if (!community) return res.status(404).json({ message: 'Community not found' });

    // ✅ 2. Only count members that exist and have names
const validMembers = community.members.filter(m => m && m.name);
const membersCount = validMembers.length;
    // ✅ 3. Get challenges in the community
    const challenges = await Challenge.find({ community: communityId }).select('_id');

    // ✅ 4. Get contributions
    const contributions = await Contribution.find({
      challenge: { $in: challenges.map((c) => c._id) },
    });

    const totalActions = contributions.length;
    const avgActionsPerMember = membersCount > 0 ? totalActions / membersCount : 0;

    const predictedReductionKgCO2 = totalActions * 0.5;

        // ✅ NEW LINE: Count unique contributors
    const uniqueContributors = new Set(contributions.map(c => c.user.toString()));
    const contributorsCount = uniqueContributors.size;

    // ✅ NEW LINE: Total Points
    const totalPoints = contributions.reduce((sum, c) => sum + c.points, 0);
    // ✅ 5. Return correct stats
    res.json({
      membersCount,
      totalActions,
      avgActionsPerMember: parseFloat(avgActionsPerMember.toFixed(2)),
      predictedReductionKgCO2: parseFloat(predictedReductionKgCO2.toFixed(2)),
      goalKgCO2: community.carbonReductionGoal || 100,
      goalPeriodMonths: community.goalPeriodMonths || 1,
        contributorsCount,
          totalPoints 



    });
  } catch (err) {
    console.error('Prediction error:', err);
    res.status(500).json({ message: 'Error predicting impact' });
  }
};
