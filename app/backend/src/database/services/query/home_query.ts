const homeLeaderboard = `
SELECT 
*, 
FORMAT((classificação.totalPoints) / (classificação.totalGames * 3) * 100, 2) as "efficiency"
FROM (SELECT 
team_name as "name",
(SUM(case 
when mt.home_team_goals > mt.away_team_goals then 3 
when mt.home_team_goals = mt.away_team_goals then 1
else 0 end)) as "totalPoints",
COUNT(mt.home_team) as "totalGames",
SUM(case when mt.home_team_goals > mt.away_team_goals then 1 else 0 end) as "totalVictories",
SUM(case when mt.home_team_goals = mt.away_team_goals then 1 else 0 end) as "totalDraws",
SUM(mt.home_team_goals) as "goalsFavor",
SUM(mt.away_team_goals) as "goalsOwn",
SUM(case when mt.home_team_goals < mt.away_team_goals then 1 else 0 end) as "totalLosses",
SUM(mt.home_team_goals) - SUM(mt.away_team_goals) as "goalsBalance"
FROM TRYBE_FUTEBOL_CLUBE.matches as mt 
JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON mt.home_team = t.id
WHERE in_progress = 0
GROUP BY mt.home_team) as classificação
ORDER BY classificação.totalPoints desc,
classificação.goalsBalance desc ,
classificação.goalsFavor desc,
classificação.goalsOwn desc;`;

export default homeLeaderboard;
