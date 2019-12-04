import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            console.log(err)
            return new Promise((resolve, reject) => {
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
                    
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid Account ');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {
        let access_token = this.getAccessToken();
        
        if ( !access_token )
        {
            this.emit('onNoAccessToken');

            return;
        }

        if ( this.isAuthTokenValid(access_token) )
        {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else
        {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'https://stage02.solusta.me/api/authenticate',
                headers: {}, 
                data: {
                  username: email,
                  password:password
                }
              }).then(response => {
                if ( response.data.id_token )
                {
                    this.setSession(response.data.id_token);
                    let config = {
                        headers: {'Authorization': "bearer " + response.data.id_token}
                    };
                    
                    let bodyParameters = {
                       key: "value"
                    }
                    
                    axios.get( 
                        'https://stage02.solusta.me/api/account',
                        bodyParameters,
                        config).then((response) => {
                            let user = {data:{}};
                            user.data = response.data;
                            user.data.password = password;
                            user.data.displayName = response.data.firstName + ' ' + response.data.lastName;
                            user.data.photoURL = response.data.imageUrl;
                            user.data.settings = {};
                            user.data.shortcuts = [];
                            user.role = response.data.login
                            console.log(user);
                            resolve(user);
                    }).catch(
                        (error) => {
                        console.log(error)
                    });
                }
                else
                {
                    reject(response.data.error);
                }
              });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem('jwt_access_token');
            let config = {
                headers: {'Authorization': "bearer " + token}
            };
            let bodyParameters = {
                key: "value"
            }
            axios.get('https://stage02.solusta.me/api/account',bodyParameters,config)
                .then(response => {
                    // console.log(response)
                    let user = {data:{}};
                    user.data = response.data;
                    user.data.displayName = response.data.firstName +' '+ response.data.lastName;
                    user.data.photoURL = response.data.imageUrl;
                    user.data.settings = {};
                    user.data.shortcuts = [];
                    user.role = response.data.login
                    if ( user.role )
                    {
                        this.setSession(token);
                        resolve(user);
                    }
                    else
                    {
                        this.logout();
                        reject('Failed to login with token.');
                    }
                })
                .catch(error => {
                    this.logout();
                    reject('Failed to login with token.');
                });
        });
    };

    setSession = access_token => {
        // console.log(access_token)
        if ( access_token )
        {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if ( !access_token )
        {
            return false;
        }
        const decoded = jwtDecode(access_token);
        
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
