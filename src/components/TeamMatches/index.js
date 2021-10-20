import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'

import './index.css'

class TeamMatches extends Component {
  state = {matchDetails: [], latestMatch: [], matches: [], isLoading: true}

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const updatedId = id.slice(1)
    const response = await fetch(`https://apis.ccbp.in/ipl/${updatedId}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const {recentMatches} = updatedData

    const updateLatestMatch = {
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      date: data.latest_match_details.date,
      id: data.latest_match_details.id,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const updateRecentMatch = recentMatches.map(eachData => ({
      umpires: eachData.umpires,
      result: eachData.result,
      manOfTheMatch: eachData.man_of_the_match,
      date: eachData.date,
      id: eachData.id,
      venue: eachData.venue,
      competingTeam: eachData.competing_team,
      competingTeamLogo: eachData.competing_team_logo,
      firstInnings: eachData.first_innings,
      secondInnings: eachData.second_innings,
      matchStatus: eachData.match_status,
    }))

    this.setState({
      matchDetails: updatedData,
      latestMatch: updateLatestMatch,
      matches: updateRecentMatch,
      isLoading: false,
    })
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const updatedId = id.slice(1)
    const {matchDetails, latestMatch, matches, isLoading} = this.state
    const {teamBannerUrl} = matchDetails
    return (
      <div className={`${updatedId}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className={`${updatedId}`}>
            <img src={teamBannerUrl} alt="team banner" className="teamImg" />
            <p className="latestName">Latest Matches</p>
            <LatestMatch matchDetails={latestMatch} />
            <ul className="ulContainer">
              {matches.map(each => (
                <MatchCard matchDetails={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
