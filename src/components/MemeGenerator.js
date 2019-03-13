import React from "react";

class MemeGenerator extends React.Component {
	constructor() {
		super();
		this.state = ({
			targWidth: 482,
			targHeight: 453,
			topText: "",
			bottomText: "",
			randImg: "https://i.imgflip.com/1ey8yl.jpg",
			allMemeImgs: []
		})

		this.handleChange = this.handleChange.bind(this);
		this.generate = this.generate.bind(this);
	}

	componentDidMount() {
		fetch("https://api.imgflip.com/get_memes")
			.then(response => response.json())
			.then(response => {
				const memes = response.data.memes;
				this.setState({
					allMemeImgs: memes
				})
			})
	}


	handleChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	generate() {
		
		let randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);

		this.setState({
			targWidth: this.state.allMemeImgs[randNum].width,
			targHeight: this.state.allMemeImgs[randNum].height,
			randImg: this.state.allMemeImgs[randNum].url
		})
	}

	render() {
		return (
			<div>
			<form className = "name-form">
				Top Text: <input name = "topText" placeholder = "thing" type = "text" onChange = {this.handleChange}/>&nbsp;
				Bottom Text: <input name = "bottomText" placeholder = "resolution" type = "text" onChange = {this.handleChange}/>&nbsp;
				<button type = "button"value = "Generate!" onClick = {this.generate}>Generate!</button>
			</form>


			<div className = "meme" style = {{backgroundImage:"url(" + this.state.randImg + ")", width: this.state.targWidth + "px",  height: this.state.targHeight + "px"}}>
				<p className = "top"> {this.state.topText} </p>
				<p className = "bottom"> {this.state.bottomText} </p>
			</div>
			</div>
		);
	}
}

export default MemeGenerator;