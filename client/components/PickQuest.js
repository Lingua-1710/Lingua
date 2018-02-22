import React, { Component } from 'react'
import { Entity } from 'aframe-react'
import { connect } from 'react-redux'
import { fetchQuests, setQuest, getGameState } from '../store'

export class PickQuest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedQuest: 1
    }
  }

  componentDidMount() {
    this.props.getQuests()
  }

  render() {
    const selectedQuest = this.state.selectedQuest
    return (
      this.props.gameState === 'quest' &&
      <Entity
        id="pick-quest-plane"
        primitive="a-plane"
        height="1"
        width="2"
        position="0 2 -3.01"
        radius="2"
        color="grey"
        opacity="0"
      >
        <Entity
          id="pick-quest-text"
          primitive="a-text"
          font="exo2bold"
          value="PICK A QUEST"
          height="12"
          color="white"
          align="center"
          position="0 1.5 0"
        />
        {
          this.props.quests &&
          this.props.quests.map((quest, index) => {
            return (
              <Entity
                key={quest.id}
                id="pick-quest-plane"
                primitive="a-plane"
                height=".5"
                width="2"
                position={`0 ${1 - index * .5} 0`}
                radius="0"
                color='blue'
                opacity="0"
                class="clickable"
                events={{
                  click: () => {
                    this.props.chooseQuest(quest)
                    this.setState({ selectedQuest: quest.id})
                  }
                }}
              >
                <Entity
                  id="pick-quest-text"
                  primitive="a-text"
                  font="exo2bold"
                  value={quest.name}
                  height="12"
                  color={selectedQuest === quest.id ? 'green' : 'white'}
                  align="center"
                  position={`0 0 .01`}
                />
              </Entity>
            )
          })
        }
        <Entity
          id="button-plane"
          primitive="a-plane"
          height=".5"
          width="2"
          position="0 -1.5 0"
          radius="0"
          color="blue"
          class="clickable"
          events={{
            click: () => this.props.setGameState('loading')
          }}
        >
          <Entity
            id="ready-button"
            primitive="a-text"
            font="exo2bold"
            value="START"
            height="10"
            color="white"
            align="center"
            position="0 0 .01"
          />
        </Entity>
      </Entity>
    )
  }
}

const mapStateToProps = ({ quests, gameState }) => ({ quests, gameState })

const mapDispatchToProps = (dispatch) => {
  return {
    getQuests: (() => dispatch(fetchQuests())),
    chooseQuest: (quest => dispatch(setQuest(quest))),
    setGameState: (gameState => dispatch(getGameState(gameState)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickQuest)
