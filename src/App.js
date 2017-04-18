import React, { Component } from 'react';
import $ from "jquery";
import './App.css';
import Dropzone from 'react-dropzone';
import * as configs from "./config"
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/lib/button/Button'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import IconButton from 'react-toolbox/lib/button/IconButton'
import Layout from 'react-toolbox/lib/layout/Layout'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import Panel from 'react-toolbox/lib/layout/Panel'
import Sidebar from 'react-toolbox/lib/layout/Sidebar'
import Tabs from 'react-toolbox/lib/tabs/Tabs'
import Tab from 'react-toolbox/lib/tabs/Tab'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Input from 'react-toolbox/lib/input/Input'
import Snackbar from 'react-toolbox/lib/snackbar/Snackbar'
import Card from 'react-toolbox/lib/card/Card'
import CardMedia from 'react-toolbox/lib/card/CardMedia'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import ListDivider from 'react-toolbox/lib/list/ListDivider'

class App extends Component {

  constructor(props) {
		super(props);
		this.state = {
			loading: false,
			type: null,
			message: null,
      app_file: [],
      app_name: "",
      app_description: "",
      app_icon_url: "",
      main_component_name: "",
      app_file_location: "",
      showModal: false,
      xhr_request_progress: 0,
      text: "",
      text_index: 0,
      fixedIndex: 0,
      show_snackbar: false,
      disable_publish_tab: true
		};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
	}
  resetValues() {
    var states = {}
    states["app_name"] = "";
    states["app_description"] = "";
    states["main_component_name"] = "";
    states["app_icon_url"] = "";
    this.setState(states);
  }

  handleFixedTabChange = (index) => {
   this.setState({fixedIndex: index});
  };

  onDrop(acceptedFiles, rejectedFiles) {
    console.log("On dropped");
    var form_data = new FormData();
    form_data.append('view_component_file', acceptedFiles[0], acceptedFiles[0].name);
    this.setState({ showModal: true});
    $.ajax({
      url: configs.API_URL+"/nanoapps/upload",
      method: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data:form_data,
      beforeSend: function() {
        this.resetValues();
      }.bind(this),
      success: function(data) {
        this.setState({
                        show_snackbar: true,
                        message: 'Successfully uploaded the app',
                        disable_publish_tab: false,
                        app_file_location: data.file_path,
                        fixedIndex: 1,
                      })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.setState({ type: 'danger',
                        message: xhr.response.status});
      }.bind(this),
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100, 10);
                this.setState({xhr_request_progress: percentComplete})

            }
        }.bind(this), false);
        return xhr;
      }.bind(this),
    });
  }

  onOpenClick() {
      this.dropzone.open();
  }

  handleChange = (name, value) => {
    //Ask sattu about this
    this.setState({...this.state, [name]: value});
  }

  handleSubmit(event) {
    console.log("Handling submission");
    var data = {
      app_file_location: this.state.app_file_location,
      app_name: this.state.app_name,
      app_description: this.state.app_description,
      main_component_name: this.state.main_component_name,
      thumbnail_location: this.state.app_icon_url
    }
    $.ajax({
      url: configs.API_URL+"/nanoapps/add_app_details",
      method: 'POST',
      cache: false,
      contentType: 'application/json',
      data: JSON.stringify({data}),
      beforeSend: function() {
        this.resetValues();
      }.bind(this),
      success: function(data) {
        this.setState({ show_snackbar: true, message: 'Successfully published the app' })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.setState({ type: 'danger', message: xhr.response.status});
      }.bind(this),
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100, 10);
                this.setState({xhr_request_progress: percentComplete})
            }
        }.bind(this), false);
        return xhr;
      }.bind(this),
    });
		event.preventDefault();
  }

  handleSnackbarClick = (event, instance) => {
     this.setState({ show_snackbar: false });
   };

   handleSnackbarTimeout = (event, instance) => {
     this.setState({ show_snackbar: false });
   };


  render() {
    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">
                {this.state.message}
             </div>;
    }
    var progressbar_style = "hide";
    if (this.state.xhr_request_progress != 0) {
      if (this.state.xhr_request_progress<100) {
        progressbar_style = "show";
      } else if (this.state.xhr_request_progress==100) {
        progressbar_style = "hide";
      }
    }
    return (
        <Layout>
            <NavDrawer active={this.state.drawerActive}
                pinned permanentAt='xxxl'>
                <section>
                  <div className="logo">
                  </div>
                </section>
                <section>
                  <div className="below_logo">
                  </div>
                </section>
                <section>
                  <List selectable ripple>
                    <ListItem caption='Create nanoapp'  selectable/>
                    <ListDivider />
                    <ListItem caption='Documentation' />
                    <ListDivider />
                    <ListItem caption='Installs and Analytics' />
                    <ListDivider />
                    <ListItem caption='Android and iOS SDK' />
                  </List>
                </section>
            </NavDrawer>
            <Panel>
              <div className="below_logo">
              </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <h3>Create and publish the nanoapp</h3>
                      <div>
                        <ProgressBar mode='determinate' className={progressbar_style} value={this.state.xhr_request_progress}/>
                      </div>
                      <Tabs index={this.state.fixedIndex} onChange={this.handleFixedTabChange} fixed>
                        <Tab label='Upload'>
                          <div className="split-box">
                              <Dropzone ref={(node) => { this.dropzone = node; }}  onDrop={this.onDrop}>
                                  <h4> Drag and drop the file </h4>
                              </Dropzone>
                          </div>
                        </Tab>
                        <Tab label='Publish' disabled={this.state.disable_publish_tab}>
                          <section>
                            <form>
                            <Input type="text" required value={this.state.app_name} label="App name" name="app_name" onChange={this.handleChange.bind(this, 'app_name')} maxLength={30} />
                            <Input type="text" required value={this.state.app_description} label="Description" name="app_description" onChange={this.handleChange.bind(this, 'app_description')} />
                            <Input type="text" required value={this.state.main_component_name} label="Index component" name="main_component_name"  onChange={this.handleChange.bind(this, 'main_component_name')} />
                            <Input type="text" required value={this.state.app_icon_url} label="App icon url" name="app_icon_url" onChange={this.handleChange.bind(this, 'app_icon_url')}/>
                            <Button raised primary type="submit" onClick={this.handleSubmit}>Publish</Button>
                            </form>
                          </section>
                        </Tab>
                      </Tabs>
                      <section>
                        <Snackbar
                          action='Dismiss'
                          active={this.state.show_snackbar}
                          label={this.state.message}
                          timeout={2000}
                          onClick={this.handleSnackbarClick}
                          onTimeout={this.handleSnackbarTimeout}
                          type='cancel'
                        />
                    </section>
                </div>
            </Panel>
        </Layout>
    );
  }
}

export default App;
