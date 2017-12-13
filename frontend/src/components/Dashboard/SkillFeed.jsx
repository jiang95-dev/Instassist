import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

import style from './skill-feed.scss'

class SkillFeed extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newSkill: '', 
        };
    }

    render() {
        if (this.props.skills) {
            var labels = this.props.skills.map(skill => {
                return (
                    <Label key={skill} className="my-label">&nbsp;{skill}&nbsp;</Label>
                )
            });
        }

        return (
            <section className="my-skills">
                <h1>My Skills</h1>
                <Label.Group circular size="medium">
                    {labels}
                    <Label className="new" >
                        <input 
                            className="new-skill"
                            value={this.state.newSkill} 
                            maxLength="15"
                            //onClick={() => this.setState({ newSkill: '' })}
                            onChange={e => this.setState({ newSkill: e.target.value })} 
                            onKeyPress={e => {
                                if (e.key === 'Enter' && this.state.newSkill.trim()) {
                                    this.props.addSkill(this.state.newSkill)
                                    this.setState({ newSkill : '' })
                                }
                            }}
                            type="text" 
                        />
                    </Label>
                </Label.Group>
            </section>
        );
    }
}

export default SkillFeed;