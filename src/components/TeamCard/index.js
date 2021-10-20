import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {team} = props
  const {name, teamImageUrl, id} = team
  return (
    <Link to={`/team-matches/:${id}`} className="linkClass">
      <li className="teamContainer">
        <img src={teamImageUrl} alt={`${name}`} className="img" />
        <p className="teamName">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
