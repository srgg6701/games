/**
 * Add new user
 * @usersData argument - function gets this only if there are users exist in DB already
 * then it adds new one setting it as unique by assigning an username
 */
function addUser(localUserData, account_type, usersData) {
    var real_money1, real_money2;
    if(account_type=="money"){
        var rmrStages = getRealMoneyRegStages();
        real_money1=rmrStages[0];
        real_money2=rmrStages[1];
        //console.log('real_money1 = '+real_money1+', real_money2 = '+real_money2);
    }
    var username;
    // if Demo account or Money, step 1
    if(!real_money2){
        // if no users at all:
        if(!usersData) usersData=new Object();
        // store username locally and withis global User object
        username = User.mainData.username = localUserData['username']; 
        // create new User container for saving in DB later
        // common data, for all types of account:
        usersData[username]=setUserData(localUserData,'mainData');
        usersData[username].account_type=User.account_type=account_type;
        /*-if(real_money1){ // test
            console.log('real_money, step1. usersData:');
            console.dir(usersData[username]);
        }*/
    // for 'money' type only
    }else{
        // extract userdata from User object stored there on previous step
        username=User.mainData.username; // it must be there for this moment
        /*  create object to fill it with current values from Form.
            It will be used later as bufer for data to save it into DB */
        var usersList,usersData;
        //first, get all current users if they exist
        if(usersList=getUsers()) usersData=JSON.parse(usersList);
        // otherwise create first
        else usersData=new Object();
        usersData[username]={}; // next, create the new User object
        /*  Now, fill the object with data, saved in User.mainData on the previous step.
            ------------------------------------------------------------------------
            Store new User main data within buffer to save it in DB later */
        for(var main_field in User.mainData){
            if(main_field!=='username')
                usersData[username][main_field]=User.mainData[main_field];
        }
        // add account_type
        User.account_type=usersData[username]['account_type']=account_type;
        // store new User xtra data within buffer to save it in DB later 
        for(var xtra_field in User.xtraData){ 
            //console.log('xtra_field: '+xtra_field+', username: '+User.mainData.username+', localUserData[xtra_field]: '+localUserData[xtra_field]+'\nUser, usersData, localUserData:');
            //console.dir(User); console.dir(usersData); console.dir(localUserData);           
            // ...and fill User object xtra data
            User.xtraData[xtra_field]=usersData[username][xtra_field]=localUserData[xtra_field]||"";
        }        
    }   //console.dir(usersData); //return false;
    // store data in DB - if Demo account or Money, step 2
    if(!real_money1){ 
        window.localStorage.setItem('users', JSON.stringify(usersData));
        // check if user was added:
        var datasetsUsers = JSON.parse(getUsers());
        if(!datasetsUsers[username]){
            return showErrorMess('You are NOT registered.\nSomething went wrong...');
            //console.log('%cError: %cuser not added...','color:red','font-weight:bold');
        }else{
            var mess = "You are registered!\nYour data:\nusername: "+username;
            for(var userdata in datasetsUsers[username])
                mess+="\n"+userdata+": "+datasetsUsers[username][userdata];
            alert(mess);
            //console.log('Added user data:');
            //console.dir(datasetsUsers[username]);
        }   //alert('addUser'); return false;
    }
}
/**
 * Fill User.mainData object
 */
function setUserData(localUserData,data_name,username) {
    switch (data_name) {
        case 'account_type':
            User[data_name]=localUserData[data_name];
            break;
        case 'username':
            User['mainData'][data_name]=username;
            break;
        default:
            for(var field_name in User[data_name]){ // get fields names from User object
                if(field_name!='username'){ // User.mainData.email = usersData
                    User[data_name][field_name]=localUserData[field_name];
                }                
            }
    }
    return true;
}
/**
 * Get User form values
 */
function getUserFormValues(inputsNames) {
    var localUserData = []; //console.dir(inputsNames);
    for(var i = 0, j = inputsNames.length; i<j; i++){
        //console.log('inputsNames[i] = '+inputsNames[i]+', current localUserData: ');
        localUserData[inputsNames[i]]=(inputsNames[i]=='gender')? 
            $('[name="gender"]:checked').val() : document.getElementById(inputsNames[i]).value;
        //console.dir(localUserData[inputsNames[i]]);
    }
    return localUserData;
}
/**
 * Get fields names for data (mainData, xtraData) from the User object 
 */
function getUserParamsNames(paramsTypeName) {
    var user_param_names = [];
    var i = 0;
    for(var field in User[paramsTypeName]){
        user_param_names[i] = field;
        i++;
    }
    return user_param_names;
}
/**
 * Comment
 */
function getRealMoneyRegStages() {
    return [$('#money_step1').size(),$('#money_step2').size()];
}
/**
 * Let user login
 */
function loginUser() {
    $.getScript("models/users.js", function(){
        var localUserData = getUserFormValues(['username_or_email','password']);
        //console.dir(localUserData);
        var usersList,datasetsUsers;
        //first, get all current users if they exist
        if(usersList=getUsers())
            datasetsUsers=JSON.parse(usersList);
        else return showErrorMess('You are not registered.');
        //-------------------------------------------
        var error_mess=false;
        var user_login = false;
        if(!datasetsUsers[localUserData['username_or_email']]){ // no certain username, find out email!
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
            return showErrorMess(error_mess);
        else{
            var extractedUserData = datasetsUsers[user_login];
            // store user data as User Object
            setUserData(extractedUserData,'mainData'); 
            setUserData(extractedUserData,'xtraData');
            setUserData(extractedUserData,'account_type');
            setUserData(extractedUserData,'username',user_login); //console.dir(User);
            // show user's account
            Scene.enterAccount();
        }
    });
}
/**
 * Logout user
 */
function logoutUser() {
    User.emptyData(); // clear User object
    // and show user login form
    Scene.appendUserBlock(Scene.user_container_id_default);
}
/**
 * Register new user: check if username and email are available, add user to DB
 */
function registerUser(account_type) {  //console.log('registerUser, account_type: '+account_type);    
    $.getScript("models/users.js", function(){
        //console.log(localUserData);
        var real_money1, real_money2;
        if(account_type=="money"){
            var rmrStages = getRealMoneyRegStages();
            real_money1=rmrStages[0];
            real_money2=rmrStages[1];
        }
        // get incoming form values
        var userDataType = (real_money2)? 'xtraData':'mainData'
        var localUserData = getUserFormValues(getUserParamsNames(userDataType));
        // if NOT Real Money Step 2
        if(!real_money2){
            /*  if some users exist, check assigning data availability
                otherwise skip this step and just add new user  */
            if(datasetsUsers=getUsers()){    
                // users exist, check if pointed data is available
                var usersList = JSON.parse(datasetsUsers);
                //console.log('usersList:'); console.dir(usersList);
                var cancel_register = false;
                if(usersList[localUserData['username']])
                    return showErrorMess('Username name is taken!');
                else{
                    for(var existing_username in usersList){
                        //console.log(usersList[existing_username]['email']+' : '+localUserData['email']);
                        if(usersList[existing_username]['email']==localUserData['email'])
                            return showErrorMess('Email is taken!');
                    }
                }
            }
        }
        // register new user        
        addUser(localUserData,account_type,usersList) // true or false
        if(!real_money1) Scene.enterAccount(); // User.account_type is already set in addUser()
        else Scene.appendUserBlock('my_profile_real_money_account2');
    });
}