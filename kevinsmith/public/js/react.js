var Users = React.createClass({

    getInitialState: function(){
        return {
            name: "",
            crud: "",
            id: "",
            data: []
        };
    },


    componentDidMount: function(){
            this.setState({name: "Default Dan"})
    },

    clearCrud: function() {
        this.setState({crud:""});
    },

    Get: function() {     
        console.log("GET!");
        $.ajax({
              method: "GET",
              url: "/users",
              cache: false
            })
          .done((msg) => {
            var myname = msg.name;
            console.dir(msg.data);
            var dataArray = [];
            msg.data.forEach(function(elem) {
                dataArray.push(elem.name)
            })
            this.setState({data:dataArray});
            this.setState({crud:"GET"});
          });
    },

    Post: function() {     
            console.log("POST!");
            this.setState({crud:"POST"});
    },

    Put: function() {     
            console.log("PUT!");
            this.setState({crud:"PUT"});
    },

    Delete: function() {     
            console.log("DELETE!");
            this.setState({crud:"DELETE"});
    },

    postSave: function() {
        $.ajax({
              method: "POST",
              url: "/users",
              cache: false,
              headers: {'Content-Type':'application/json'},
              data: ReactDOM.findDOMNode(this.refs.newText).value
        })
          .done((msg) => {
            console.dir(msg);
            this.setState({crud:""});
          });

    },

    renderGet: function() {
        return(
            <div className="note">
                <h1>Hello, {this.state.name}. I got your name from MongoDB </h1>
                <span>
                    <button onClick={this.clearCrud}
                            className="btn btn-primary">OK</button>
                </span>
                <p> {this.state.data} </p>
            </div>
        )
    },

    renderPut: function() {
        return(
            <div className="note">
                <h1>Hello, {this.state.name}. I got your name from MongoDB </h1>
                <span>
                    <button onClick={this.clearCrud}
                            className="btn btn-primary">OK</button>
                </span>
            </div>
        )
    },

    renderPost: function() {
        return (
            <div className="note">
            <textarea ref="newText" defaultValue='{"name":"placeholder", "password":"placeholder"}' 
            className="form-control"></textarea>
            <button onClick={this.postSave} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            <button onClick={this.render} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        )
    },

    renderDelete: function() {
        return(
            <div className="note">
                <h1>Hello, {this.state.name}. I got your name from MongoDB </h1>
                <span>
                    <button onClick={this.clearCrud}
                            className="btn btn-primary">OK</button>
                </span>
            </div>
        )
    },

    renderDisplay: function() {
        return (
            <div className="note">
                <h1>Hello, {this.state.name}. {this.props.children}</h1>
                <span>
                    <button onClick={this.Post}
                            className="btn btn-primary glyphicon glyphicon-plus"/>
                    <button onClick={this.Get}
                            className="btn btn-success glyphicon glyphicon-asterisk"/>
                    <button onClick={this.renderPut}
                            className="btn btn-warning glyphicon glyphicon-pencil"/>
                    <button onClick={this.renderDelete}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            
        )
    },

    render: function() {
        switch(this.state.crud) {
            case "GET":
                return this.renderGet();
            case "POST":
                return this.renderPost();
            case "PUT":
                return this.renderPut();
            case "DELETE":
                return this.renderDelete();
            case "":
                return this.renderDisplay();
        }
    }

});

ReactDOM.render(<Users>Welcome to my app.</Users>, document.getElementById('react-container'));
