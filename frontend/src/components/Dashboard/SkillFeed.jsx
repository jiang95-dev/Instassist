import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

import style from './skill-feed.scss'

class SkillFeed extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            newSkill: ' + ', 
            skills : props.skills
        };
    }

    addSkill(isEnter) {
        console.log(isEnter);
        if (isEnter) {
            this.setState({ 
                skills: this.state.skills.concat(this.state.newSkill),
                newSkill: ' + ' 
            });
        }
    }

    render() {
        if (this.state.skills) {
            console.log(this.state.skills);
            var labels = this.state.skills.map(skill => {
                return (
                    <Label className="my-label">&nbsp;{skill}&nbsp;</Label>
                )
            });
        }

        return (
            <section className="my-skills">
                <h1>My Skills</h1>
                <Label.Group circular size="medium" color="blue">
                    {labels}
                    <Label className="new" >
                        <input 
                            value={this.state.newSkill} 
                            maxLength="15"
                            onClick={() => this.setState({ newSkill: '' })}
                            onChange={e => this.setState({ newSkill: e.target.value })} 
                            onKeyPress={e => this.addSkill(e.key === 'Enter')}
                            type="text" 
                        />
                    </Label>
                </Label.Group>
            </section>
        );
    }
}

export default SkillFeed;