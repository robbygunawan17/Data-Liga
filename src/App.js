import React, { Component } from 'react';
import './App.css';
import Standing from './components/Standings';

class App extends Component {

    state = {
        leagues: [
            { id: 2002, name: 'Bundesliga' },
            { id: 2014, name: 'La Liga' },
            { id: 2015, name: 'Ligue 1' },
            { id: 2019, name: 'Serie A' },
            { id: 2021, name: 'Premier League' }
        ],
        standings: [],
        selectedLeague: ''
    }

    handleSelection = (id, name) => {
        this.fetchData(id, name);
    };

    fetchData(id, name) {
        const Token = 'c3db0d6293eb45979ca8b0dd3997dae6',
        URL = 'https://api.football-data.org/v2/competitions/' + id + '/standings';

        fetch(URL, { headers: { 'X-Auth-Token': Token } })
            .then((response) => response.json())
            .then((response) => {
                const rows = [];
                response.standings[0].table.map(
                    (item, index) => {
                        const { position, playedGames, won, draw, lost, goalsFor, goalsAgainst, goalDifference, points, team } = item;
                      
                        return (
                            rows.push(
                                { position: position, playedGames: playedGames, won: won, draw: draw, lost: lost, goalsFor: goalsFor, goalsAgainst: goalsAgainst, goalDifference: goalDifference, points: points, team: team.name, badge: team.crestUrl }
                            )
                        )
                    }
                )
                this.setState({ standings: [...rows] })
                this.setState({ selectedLeague: name})
        })
            
    }
    
    render() {
        
        const content = this.state.standings;
        let table;

        if (content.length > 0) {
            table = <thead><tr><td colSpan="9"><h3 className='liga'>{this.state.selectedLeague}</h3></td></tr><tr><th className="position">No</th><th className="team" colSpan="2">Team</th><th className="played">Played</th><th className="won">Won</th><th className="draw">Draw</th><th className="lost">Lost</th><th className="ga">GA</th><th className="points">Points</th></tr></thead>;
        }

        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center mt-2">
                        {this.state.leagues.map(league => (
                            <button className="btn btn-primary mr-2 mt-2" key={league.id} onClick={() => {this.handleSelection(league.id, league.name)}}>{league.name}</button>
                        ))}
                        </div>
                    </div>
                    <div class="row mt-4 mb-4">
                        <div class="col-md-offset-1 col-md-12">
                            <div class="panel">
                                <div class="panel-heading">
                                <div class="col col-sm-12 text-center">
                                    <h4 class="title">Klasemen Sementara</h4>
                                </div>
                                    <div class="row">                
                                        <div class="panel-body table-responsive">
                                            <table className="table">
                                                {table}
                                                <tbody>
                                                {this.state.standings.map(standing => (
                                                    <Standing
                                                        key={standing.position}
                                                        position={standing.position}
                                                        badge={standing.badge}
                                                        team={standing.team}
                                                        played={standing.playedGames}
                                                        won={standing.won}
                                                        draw={standing.draw}
                                                        lost={standing.lost}
                                                        ga={standing.goalDifference}
                                                        points={standing.points}
                                                    >
                                                    </Standing>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
