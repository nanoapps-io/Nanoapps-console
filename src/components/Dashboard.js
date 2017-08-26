import React, {Component} from 'react';
import Button from 'material-ui/Button';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer class Dashboard extends Component {
    render() {
        return <div> 
            <Button
                raised
                color="primary"
                type="submit"
            >Change
              </Button>
            </div>
    }
}
export default Dashboard