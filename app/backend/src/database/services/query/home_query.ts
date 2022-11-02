const homeLeaderboard = `
SELECT 
*, 
FORMAT((classificação.totalPoints) / (classificação.totalGames * 3) * 100, 2) as "efficiency"
FROM (SELECT 
team_name as "name",
(SUM(case 
when mth.home_team_goals > mth.away_team_goals then 3 
when mth.home_team_goals = mth.away_team_goals then 1
else 0 end)) as "totalPoints",
COUNT(mth.home_team) as "totalGames",
SUM(case when mth.home_team_goals > mth.away_team_goals then 1 else 0 end) as "totalVictories",
SUM(case when mth.home_team_goals = mth.away_team_goals then 1 else 0 end) as "totalDraws",
SUM(mth.home_team_goals) as "goalsFavor",
SUM(mth.away_team_goals) as "goalsOwn",
SUM(case when mth.home_team_goals < mth.away_team_goals then 1 else 0 end) as "totalLosses",
SUM(mth.home_team_goals) - SUM(mth.away_team_goals) as "goalsBalance"
FROM TRYBE_FUTEBOL_CLUBE.matches as mth 
JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON mth.home_team = t.id
WHERE in_progress = 0
GROUP BY mth.home_team) as leaderboard
ORDER BY leaderboard.totalPoints desc,
leaderboard.goalsBalance desc ,
leaderboard.goalsFavor desc,
leaderboard.goalsOwn desc;`;

export default homeLeaderboard;
