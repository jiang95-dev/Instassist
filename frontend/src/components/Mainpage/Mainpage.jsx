import React, { Component } from 'react'
import { Button, Card, Icon, Label, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.scss'
import Navbar from '../Navbar/Navbar.jsx'
import ModalView from '../ModalView/ModalView.jsx'


class Mainpage extends Component {
    constructor() {
        super();
        this.state = {
            popularTagList: null,
            postList: null,

            modalOpen: false,
            selected: null,
        }
        this.filterHandler = this.filterHandler.bind(this);
        this.filterResult = this.filterResult.bind(this);
        this.updateSearchResult = this.updateSearchResult.bind(this);
        
        this.cardClicked = this.cardClicked.bind(this);
    }

    /*for DV*/
    cardClicked(obj){
        console.log("card clicked");
        console.log(obj);
        this.setState({
            modalOpen: true,
            selected: obj,
        })
    }


    filterResult(filterType){
        console.log(filterType);
        var url = 'https://mighty-oasis-90906.herokuapp.com/api/projects';
        switch (filterType){
            case 'time':
                url += '?sort={"time_created": -1}'
                break;
            case 'popular':
                url += '?sort={"popularity": -1}'
                break;
            case 'name':
                url += '?sort={"name": 1}'
                break;
        } 
        console.log(url)
        axios.get(url)
        .then((response) => {
            this.setState({
                postList: response.data.data
            })
            console.log('Post data loaded!');
            console.log(this.state.postList);            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    updateSearchResult(SearchKey){
        console.log(SearchKey);
        if (typeof SearchKey == "string"){
            if(SearchKey != ""){
                let URLProject = 'https://mighty-oasis-90906.herokuapp.com/api/projects?where={"name": {"$regex": "^'+SearchKey+'"}}';
                console.log(URLProject)
                
                axios.get(URLProject)
                .then((response) => {
                    this.setState({
                        postList: response.data.data
                    })
                    console.log('Post data loaded!');
                    console.log(this.state.postList);            
                })
                .catch((error) => {
                    this.setState({
                        postList: []
                    })
                    console.log("error");
                })
            }else{
                let URLProject = 'https://mighty-oasis-90906.herokuapp.com/api/projects';
                axios.get(URLProject)
                .then((response) => {
                    this.setState({
                        postList: response.data.data
                    })
                    console.log('Post data loaded!');
                    console.log(this.state.postList);            
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        }
    }

    componentDidMount(){
        console.log('Mainpage page will mount!')      
        let URLProject = 'https://mighty-oasis-90906.herokuapp.com/api/projects';
        let URLTags = 'https://mighty-oasis-90906.herokuapp.com/api/tags';
        axios.get(URLProject)
        .then((response) => {
            this.setState({
                postList: response.data.data
            })
            console.log('Post data loaded!');
            console.log(this.state.postList);            
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get(URLTags)
        .then((response) => {
            this.setState({
                popularTagList: response.data.data
            })
            console.log('Post data loaded!');
            console.log(this.state.postList);            
        })
        .catch((error) => {
            console.log(error);
        })
    }



    filterHandler(id){
        if (id === -1){
            let disUrl = 'https://mighty-oasis-90906.herokuapp.com/api/projects';
            console.log(disUrl);
            axios.get(disUrl)
            .then((response) => {
                this.setState({
                    postList: response.data.data
                })        
                console.log("Data loaded");
                console.log(this.state.postList);
            })
            .catch((error) => {
                console.log(error);
            })
        }else{
            id = id.tid;
            let disUrl = 'https://mighty-oasis-90906.herokuapp.com/api/tags/'+id;
            console.log(disUrl);
            axios.get(disUrl)
            .then((response) => {
                this.setState({
                    postList: response.data.data.projects
                })        
                console.log("Data loaded");
                console.log(this.state.postList);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    render() {
        //Asy check
        console.log("===Mainpage===");
        console.log("modalOpen" + this.state.modalOpen);


        if (!this.state.postList || !this.state.popularTagList) {
            console.log("Here");
            return <div />
        } else {            
            let postGrid = this.state.postList.map((obj,idx) =>{
                // console.log(obj)
                if (obj.state != 0){
                    let projName = obj.name;
                    let projTagList = obj.tags;
                    let projIntro = obj.description;
                    let projTimeStamp = obj.createdAt.substr(0, 9);
                    let projViewCounter = obj.popularity;
                    let projtag = projTagList.map((tag,idx_t) =>{
                        return(
                            <Label key={idx+'p'+idx_t} basic>{tag.name}</Label>
                        )
                    })
                    return(
                        <Card 
                        key={'c'+idx}
                        header={projName}
                        meta= {projTimeStamp + "  Viewed: "+ projViewCounter}
                        extra= {projtag}
                        description={projIntro}
                        onClick={() => {this.cardClicked(obj)}}
                        />
                    )
                }
            });
            let popTags = this.state.popularTagList.map((obj, key)=>{
                if (key < 5 && key < this.state.popularTagList.length){
                    let tid = obj._id;
                    return (<Label as='a' key={'t'+key} onClick={()=>this.filterHandler({tid})} basic>{obj.name}</Label>)                    
                }
            });

            return(
                <div>
                    <Navbar search={this.updateSearchResult}/>
                    <div className="Mainpage">
                        <div className="sidebar">
                            <h3 id="MainpageTitle">Popular Tags</h3>
                            <div className="popularTags">
                                <Label as='a' onClick={()=>this.filterHandler(-1)} basic>All</Label>
                                {popTags}
                            </div>
                            <hr />
                            <h3 id="MainpageTitle">Filters</h3>
                            <div className="filters">
                                <Label as='a' onClick={()=>this.filterResult('nofilter')} basic>No filter</Label>
                                <Label as='a' onClick={()=>this.filterResult('name')} basic>Name</Label>
                                <Label as='a' onClick={()=>this.filterResult('time')} basic>Recent</Label>
                                <Label as='a' onClick={()=>this.filterResult('popular')} basic>Popularity</Label>
                            </div>
                        </div>
                        <div className="vr"/>
                        <div className="postGrid">
                            {postGrid}
                        </div>
                    </div>
                    <ModalView open={this.state.modalOpen} selected={this.state.selected}/>
                </div>
            )
        }
    }
}

export default Mainpage

