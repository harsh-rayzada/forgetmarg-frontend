import React from 'react';
import './Landingpage.css';

class Landingpage extends React.Component{
    constructor(props){
        super(props);
        this.setSelected = this.setSelected.bind(this);
        this.uploadVideo = this.uploadVideo.bind(this);
        this.playSelected = this.playSelected.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
    }

    state = {
        content: [{
            name: 'Lecture 1',
            link: 'http://localhost:4000/static/1.mp4'
        },{
            name: 'Lecture 2',
            link: 'http://localhost:4000/static/2.mp4'
        },{
            name: 'Lecture 3',
            link: 'http://localhost:4000/static/3.mp4'
        },{
            name: 'Lecture 4',
            link: 'http://localhost:4000/static/4.mp4'
        },{
            name: 'Lecture 5',
            link: 'http://localhost:4000/static/5.mp4'
        }],
        showVideo: false,
        currentVideoName: '',
        currentVideoLink: '',
        currentFile: {},
        currentFileName: ''
    }

    componentDidMount(){
        this.setState({
            currentVideoName: this.state.content[0]['name'],
            currentVideoLink: this.state.content[0]['link']
        });
    }

    componentDidUpdate(){
        console.log('called');
    }

    setSelected(index){
        let that = this;
        this.setState({
            currentVideoName: that.state.content[parseInt(index)]['name'],
            currentVideoLink: that.state.content[parseInt(index)]['link'],
            showVideo: false
        }, () => {
            console.log(this.state);
        });
    }

    playSelected(){
        this.setState({
            showVideo: true
        }, () => {
            this.refs.videoContent.play();
        });

    }

    uploadVideo(e){
        if(e.target.files && e.target.files.length > 0){
            this.setState({
                currentFile: e.target.files[0],
                currentFileName: e.target.files[0].name
            }, () => {
                console.log(this.state)
            });
        }

        // this.setState({
        //     currentFileName: e.target.files[0].name
        // })

        // reader.readAsDataURL(file);
    }

    openFileBrowser(){
        this.refs.fileupload.click();
    }

    render(){
        return <div className='body'>
            <div className='content-header'>
                <div className='content-header-container'>
                    <div className='content-header-text'>
                        <p>Economics 101</p>
                    </div>
                </div>
            </div>
            <div className='content-container'>
                <div className='upload-form-container'>
                    <div className='upload-input-container'>
                        <input type='text' onClick={this.openFileBrowser} value={this.state.currentFileName}></input>
                    </div>
                    <div className='upload-button-container'>
                        <div className='upload-button' onClick={this.uploadVideo}>
                            {/* <label for='fileupload'>Upload Lecture</label> */}
                            <p>Upload Lecture</p>
                            <input className='hide' ref='fileupload' type='file' onChange={this.uploadVideo}></input>
                        </div>
                    </div>
                </div>
                <div className='primary-video-container'>
                    <div className={'video-frame ' + (this.state.showVideo == false ? 'show' : 'hide')}>
                        <div className='video-frame-placeholder' onClick={this.playSelected}>
                            <img src={require("../../assets/play.svg")} alt='play'></img>
                        </div>
                    </div>
                    <div className={'video-player ' + (this.state.showVideo == true ? 'show' : 'hide')}>
                        <video ref='videoContent' controls key={this.state.currentVideoLink}>
                            <source src={this.state.currentVideoLink} key={this.state.currentVideoLink} type="video/mp4"/>
                        </video>
                    </div>
                    <div className='video-name-container'>
                        <p>{this.state.currentVideoName}</p>
                    </div>
                </div>
                <div className='video-container'>
                    {this.state.content.map((content, i) => 
                        <div className='video-content' key={i}>
                            <div className='video-content-overlay-container'>
                                <div className='video-overlay-content'>
                                    <div className='video-name'>
                                        <p>{content.name}</p>
                                    </div>
                                    <div className='video-play-button' onClick={(e) => this.setSelected(i)}>
                                        <img src={require("../../assets/play.svg")} alt='play'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    }
}

export default Landingpage;