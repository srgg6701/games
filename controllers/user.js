/**
 * Comment
 */
function showErrorMess(error_text) {
    alert(error_text);
}
/**
 * Comment
 */
function getLocalUserData(localUserData) {
    for(var i = 0, j = localUserData.length; i<j; i++)
        localUserData[localUserData[i]]=document.getElementById(localUserData[i]).value;
    return localUserData;
}
/**
 * Register new user
 */
function registerUser(account_type) {      
    $.getScript("models/users.js", function(){
        var localUserData = getLocalUserData(['username','email','password']);
        console.dir(localUserData);
        /* 
        var username        = document.getElementById('username').value,
            useremail       = document.getElementById('email').value,
            userpassword    = document.getElementById('password').value;*/
        /**
         * just add new user
         */
        var addUser = function (userData) {
            userData[localUserData['username']]={
                email:      localUserData['useremail'],
                password:   localUserData['userpassword'],
                account:    account_type
            } //console.dir(newUser); 
            if(window.localStorage.setItem('users', JSON.stringify(userData)))
                console.log('%cError: %cuser not added...','color:red','font-weight:bold');
        }
        // no users at all, create first
        if(!(datasetsUsers=getUsers())){
            console.log('No users yet');
            var newUser = {};
            addUser(newUser);            
        }else{  
            datasetsUsers = JSON.parse(datasetsUsers);
            console.log('datasetsUsers:');
            console.dir(datasetsUsers);
            var cancel_register = false;
            if(datasetsUsers[localUserData['username']]){
                showErrorMess('Username name is taken!');
                cancel_register=true;
            }else{
                for(var existing_username in datasetsUsers){
                    if(datasetsUsers[existing_username]['email']==localUserData['useremail']){
                        showErrorMess('Email is taken!');
                        cancel_register=true;
                        break;
                    }
                }
            }
            // register new user
            if(!cancel_register){
                addUser(datasetsUsers);
            }
        }
    });
}

/**
 * Let user login
 */
function loginUser() {
    $.getScript("models/users.js", function(){
        var localUserData = getLocalUserData(['username_or_email','password']);
        console.dir(localUserData);
        datasetsUsers = JSON.parse(getUsers()); console.dir(datasetsUsers);        
        var error_mess=false;
        var user_login = false;
        if(!datasetsUsers[localUserData['username_or_email']]){
            error_mess = "Your username or e-mail is wrong";// no username, check email
            for(var username in datasetsUsers){
                if(datasetsUsers[username]['email']==localUserData['username_or_email']){
                    user_login = username;
                    error_mess = false;
                    break;
                }
            }
        }else user_login = localUserData['username_or_email'];
        // username or useremail is found, then check password
        if(!error_mess // this means that we got a real user login  
           && datasetsUsers[user_login]['password']!=localUserData['password']
          ) error_mess = "Your password is wrong";
        // something went wrong
        if(error_mess)
            showErrorMess(error_mess);
        else{// store user data and show his account - Demo or Money
            User={
                login:      user_login,
                email:      datasetsUsers[user_login]['email'],
                password:   datasetsUsers[user_login]['password']
            };
            if(datasetsUsers[user_login]['account']=='Money'){
                var xtraUserData = [ 'gender',          'birthday', 
                                     'address',         'zip', 
                                     'city',            'country', 
                                     'mobile_phone',    'home_phone' ];
                // store logged user data as object
                for(var i = 0, j=xtraUserData; i<j; i++) 
                    User[xtraUserData[i]]=datasetsUsers[user_login][xtraUserData[i]]||'';
            }
            Scene.enterAccount(); 
        }
    });
}