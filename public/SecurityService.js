// import Oidc from 'oidc-client';

if (document.getElementById('loginWithAjira'))
document.getElementById('loginWithAjira').addEventListener("click", signIn, false);


if (document.getElementById('getUser'))
document.getElementById('getUser').addEventListener("click", getUser, false);


if (document.getElementById('signOut'))
document.getElementById('signOut').addEventListener("click", signOut, false);

var mgr = new Oidc.UserManager({
  //userStore: new Oidc.WebStorageStateStore(),
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
  authority: 'https://login.ajiradigital.go.ke/',
  client_id: 'whitebox',
  redirect_uri: 'https://whitebox-5976b.firebaseapp.com/callback.html',
  response_type: 'id_token token',
  scope: 'openid profile address roles',
  post_logout_redirect_uri: 'https://whitebox-5976b.firebaseapp.com/index.html',
  // silent_redirect_uri: 'https://ajira-cf2ba.firebaseapp.com/static/silent-renew.html',
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
})

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

mgr.events.addUserLoaded(function (user) {  
  console.log('New User Loaded：', arguments);
  console.log('Acess_token: ', user.access_token)
});

mgr.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments);
});

mgr.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments);  
  alert('Session expired. Going out!');
  mgr.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

mgr.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments);
});

mgr.events.addUserSignedOut(function () {
  alert('Going out!');
  console.log('UserSignedOut：', arguments);
  //mgr.removeUser();
  mgr.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

// export default class SecurityService {

  // constructor(){
  //   console.log('Construtor')
  // }

  function getUser () {
    let self = this
    console.log('get user')
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
        } else{
          console.log(user)
          return user
        }
      }).catch(function (err) {
        console.log(err)
      });
  }
  function getSignedIn () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{                    
          return resolve(true)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }
  function signIn () {
    mgr.signinRedirect().catch(function (err) {
      console.log(err)
    })
  }
  function signOut () {
    var self = this;
    mgr.signoutRedirect().then(function (resp) {      
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err)
    })
  }

  function getToken () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{          
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

 function getProfile () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{          
          return resolve(user.profile)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

 function getIdToken(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{          
          return resolve(user.id_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  function getSessionState(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{          
          return resolve(user.session_state)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

 function getAcessToken(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{          
          return resolve(user.access_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  function getScopes(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{          
          return resolve(user.scopes)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  function getRole () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{          
          return resolve(user.profile.role)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }
// }
