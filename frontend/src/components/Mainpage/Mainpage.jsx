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
        this.modalClosed = this.modalClosed.bind(this);
    }

    /*for DV*/
    cardClicked(obj, idx){
        console.log("card clicked");
        // console.log(obj);
        
        var baseURL = 'https://mighty-oasis-90906.herokuapp.com/api/projects/';
        var id = obj._id;
        var url = baseURL + id + "/popularity";


        // update popularity
        axios.put(url)
        .then((response) => {
            console.log(response.data);
            var list = this.state.postList;
            list[idx].popularity += 1;
            this.setState({
                postList: list,
            });
        })
        .catch((error) => {
            console.log(error);
            console.log("put popularity failed");
        })

        // update state in order to render modal 
        this.setState({
            modalOpen: true,
            selected: obj,
        })


    }


    filterResult(filterType){
        // console.log(filterType);
        var urlFilter = 'https://mighty-oasis-90906.herokuapp.com/api/projects';
        switch (filterType){
            case 'time':
                urlFilter += '?sort={"time_created": -1}'
                break;
            case 'popular':
                urlFilter += '?sort={"popularity": -1}'
                break;
            case 'name':
                urlFilter += '?sort={"name": 1}'
                break;
        } 
        // console.log(urlFilter)
        axios.get(urlFilter)
        .then((response) => {
            this.setState({
                postList: response.data.data
            })
            // console.log('Post data loaded!');
            // console.log(this.state.postList);            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    updateSearchResult(SearchKey){
        // console.log(SearchKey);
        if (typeof SearchKey == "string"){
            if(SearchKey != ""){
                let urlSearch = 'https://mighty-oasis-90906.herokuapp.com/api/projects?where={"name": {"$regex": ".*'+SearchKey+'.*", "$options": "i"}}';
                console.log(urlSearch)
                
                axios.get(urlSearch)
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
                let urlSearch = 'https://mighty-oasis-90906.herokuapp.com/api/projects';
                axios.get(urlSearch)
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
        // console.log('Mainpage page will mount!')      
        let URLProject = 'https://mighty-oasis-90906.herokuapp.com/api/projects';
        let URLTags = 'https://mighty-oasis-90906.herokuapp.com/api/tags?sort={"popularity": -1}';
        axios.get(URLProject)
        .then((response) => {
            this.setState({
                postList: response.data.data
            })
            // console.log('Post data loaded!');
            // console.log(this.state.postList);            
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get(URLTags)
        .then((response) => {
            this.setState({
                popularTagList: response.data.data
            })
            // console.log('Post data loaded!');
            // console.log(this.state.postList);            
        })
        .catch((error) => {
            console.log(error);
        })
    }



    filterHandler(id){
        if (id === -1){
            let urlTag = 'https://mighty-oasis-90906.herokuapp.com/api/projects';
            // console.log(urlTag);
            axios.get(urlTag)
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
            let urlTag = 'https://mighty-oasis-90906.herokuapp.com/api/tags/'+id;
            console.log(urlTag);
            axios.get(urlTag)
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

    modalClosed(){
        this.setState({
            modalOpen: false,
        });
    }

    render() {
        //Asy check
        // console.log("===Mainpage===");
        // console.log("modalOpen" + this.state.modalOpen);


        if (!this.state.postList || !this.state.popularTagList) {
            // console.log("Here");
            return <div />
        } else {            
            let postGrid = this.state.postList.map((obj,idx) =>{
                // console.log(idx);
                if (obj.state != 0){
                    let projName = obj.name;
                    // console.log(projName);
                    let projTagList = obj.tags;
                    let projIntro = obj.description;
                    if (projIntro.length > 132){
                        projIntro = projIntro.substr(0, 131);
                    }
                    let projTimeStamp = obj.createdAt.substr(0, 9);
                    let projViewCounter = obj.popularity;
                    let projtag = projTagList.map((tag,idx_t) =>{
                        return(
                            <Label key={projName+''+idx+''+idx_t} basic>{tag.name}</Label>
                        )
                    })
                    return(
                        // <div key={projName+projTimeStamp+''+idx}>
                        <Grid.Column style={{width:'auto'}}>
                            <Card
                                className="projects rounded"
                                key={projName + projTimeStamp + '' + idx}
                                header={projName}
                                meta={projTimeStamp + "  Viewed: " + projViewCounter}
                                description={projIntro}
                                extra={projtag}
                                onClick={() => { this.cardClicked(obj, idx) }}
                            />
                        </Grid.Column>
                    )
                }
            });
            let popTags = this.state.popularTagList.map((obj, key)=>{
                if (key < 5 && key < this.state.popularTagList.length){
                    let tid = obj._id;
                    return (<Label as='a' key={tid+''+key} onClick={()=>this.filterHandler({tid})} basic>{obj.name}</Label>)                    
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
                        {/* <div className="vr"/> */}
                        <div className="postGrid">
                            <Grid>
                            {postGrid}
                            </Grid>
                        </div>
                    </div>
                    <ModalView open={this.state.modalOpen} selected={this.state.selected} onClose={this.modalClosed}/>
                </div>
            )
        }
    }
}

export default Mainpage

