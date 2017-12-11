import React, { Component } from 'react'
import { Button, Card, Icon, Label, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.scss'
import Navbar from '../Navbar/Navbar.jsx'

class Mainpage extends Component {
    constructor() {
        super();
        this.state = {
            popularTagList: null,
            postList: null
        }
        // this.filterHandler = this.filterHandler.bind(this);
        
    }

    componentDidMount(){
        console.log('Mainpage page will mount!')      
        let URL = 'http://10.192.127.59:3000/api/projects';
        axios.get(URL)
        .then((response) => {
            this.setState({
                postList: response.data.data
            })
            console.log('Post data loaded!');
            console.log(this.state.postList[0]);            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        //Asy check
        console.log(this.state.postList);
        if (!this.state.postList) {
            return <div />
        } else {            
            let postGrid = this.state.postList.map((obj,idx) =>{
                console.log(obj)
                if (obj.state != 0){
                    let projName = obj.name;
                    let projTagList = obj.tag_names;
                    let projIntro = obj.description;
                    let projTimeStamp = obj.time_created.substr(0, 9);
                    let projViewCounter = obj.popularity;
                    let tags = projTagList.map((tag,idx_t) =>{
                        return(
                            <Label as='a' basic>{tag}</Label>
                        )
                    })
                    return(
                        <Card 
                        header={projName}
                        meta= {projTimeStamp + "  Viewed: "+ projViewCounter}
                        extra= {tags}
                        description={projIntro}
                        />
                    )
                }
            })

            // let projName = "Test Post";
            // let projTagList = ["Study", "Python", "C++","C++" ,"C++","C++"];
            // let tags = projTagList.map((tag,idx_t) =>{
            //     return(
            //         <Label as='a' basic>{tag}</Label>
            //     )
            // })
            // let projIntro = "asfasfsdfsadfasfasfeghagoijfiahfoahesfabseufhasfaosehfoasfjoasidjfa sjfa eaesf aesa fsaf fidasja pfpajsoiefja; sdlfjaosifjao ;spfja;sifeoj aeoijas ojg;jaie;jfasfaefoajoe;rsdhrthsrtegsergaf";
            // let projTimeStamp = "Ceated on 11/30/2017";
            // let projViewCounter = "345";


            return(
                <div>
                    <Navbar/>
                    <div className="Mainpage">
                        <div className="sidebar">
                            <h4 id="MainpageTitle">Popular Tags</h4>
                            <div className="popularTags">
                                <Label as='a' basic>test</Label>
                                <Label as='a' basic>test</Label>
                                <Label as='a' basic>test</Label>
                                <Label as='a' basic>test</Label>
                                <Label as='a' basic>test</Label>
                                <Label as='a' basic>test</Label>
                            </div>
                            <hr />
                            <h4 id="MainpageTitle">Filters</h4>
                            <div className="filters">
                                <Label as='a' basic>test</Label>
                                <Label as='a' basic>test</Label>
                                <Label as='a' basic>test</Label>
                                <Label as='a' basic>test</Label>
                            </div>
                        </div>
                        <div className="vr"/>
                        <div className="postGrid">
                            {postGrid}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Mainpage



// <Card 
// header={projName}
// meta= {projTimeStamp + "  Viewed: "+ projViewCounter}
// extra= {tags}
// description={projIntro}
// />