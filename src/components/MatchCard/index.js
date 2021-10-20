import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = matchDetails
  return (
    <div className="matchCardContainer">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="matchCardImg"
      />
      <h1>{competingTeam}</h1>
      <p>{result}</p>
      <p className={matchStatus}>{matchStatus}</p>
    </div>
  )
}

export default MatchCard
