// backend/controllers/communityController.js

const Community = require('../models/Community');
const Challenge = require('../models/Challenge');
const Contribution = require('../models/ChallengeContribution');

exports.predictImpact = async (req, res) => {
  try {
    const communityId = req.params.communityId;

    const community = await Community.findById(communityId).populate('members', 'name');
    if (!community) return res.status(404).json({ message: 'Community not found' });

    const validMembers = community.members.filter(m => m && m.name);
    const membersCount = validMembers.length;

    const challenges = await Challenge.find({ community: communityId }).select('_id');
    const contributions = await Contribution.find({ challenge: { $in: challenges.map(c => c._id) } });

    const totalActions = contributions.length;
    const avgActionsPerMember = membersCount > 0 ? totalActions / membersCount : 0;
    const predictedReductionKgCO2 = totalActions * 0.5;

    const uniqueContributors = new Set(contributions.map(c => c.user.toString()));
    const contributorsCount = uniqueContributors.size;

    const totalPoints = contributions.reduce((sum, c) => sum + (c.points || 0), 0);

    const goalKgCO2 = community.carbonReductionGoal || 100;
    const goalPeriodMonths = community.goalPeriodMonths || 1;
    const progressPercentage = (predictedReductionKgCO2 / goalKgCO2) * 100;

    res.json({
      membersCount,
      totalActions,
      avgActionsPerMember: parseFloat(avgActionsPerMember.toFixed(2)),
      predictedReductionKgCO2: parseFloat(predictedReductionKgCO2.toFixed(2)),
      goalKgCO2,
      goalPeriodMonths,
      contributorsCount,
      totalPoints,
      progressPercentage: parseFloat(progressPercentage.toFixed(1))
    });

  } catch (err) {
    console.error('Prediction error:', err);
    res.status(500).json({ message: 'Error predicting impact' });
  }
};
