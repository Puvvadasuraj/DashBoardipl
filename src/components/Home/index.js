import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {updatedData: [], isLoading: true}

  componentDidMount() {
    this.getTeamNames()
  }

  getTeamNames = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teamData = data.teams
    const changedData = teamData.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({updatedData: changedData, isLoading: false})
  }

  matchData = () => {
    const {updatedData} = this.state
    return (
      <ul className="ulContainer">
        {updatedData.map(each => (
          <TeamCard team={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="mainContainer">
        <div className="headContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="headImg"
          />
          <h1 className="mainHead">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.matchData()
        )}
      </div>
    )
  }
}

export default Home
