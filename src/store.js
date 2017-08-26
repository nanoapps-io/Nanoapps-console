import { observable } from 'mobx';

class UserState {
    @observable loggedIn = false
    @observable name = ""
    @observable email = ""
    @observable token = ""

    setUserDetails(data) {
        this.email = data['email']
        this.token = data['token']
        this.name = data['name']
    }
}

export default UserState;