
  var firebaseConfig = {
    apiKey: "AIzaSyBkMKx8KlTf0PZ5QBa8aK6XGugZRl4pOz8",
    authDomain: "bloodinfo-b2769.firebaseapp.com",
    databaseURL: "https://bloodinfo-b2769.firebaseio.com",
    projectId: "bloodinfo-b2769",
    storageBucket: "bloodinfo-b2769.appspot.com",
    messagingSenderId: "428703997938",
    appId: "1:428703997938:web:842808c2f29c30066ed56b",
    measurementId: "G-80Y8DBE7V3"
  };
   firebase.initializeApp(firebaseConfig);

   var auth=firebase.auth();
   var database=firebase.database();

   function register()
   {
       email=document.getElementById("InputEmail").value
       password=document.getElementById("InputPassword1").value
       full_name=document.getElementById("full_name").value

       if(validate_email(email)==false || validate_password(password)==false)
       {
           alert('Email or password is Wrong')
           return
       }
       if(vallidate_field(full_name)==false)
       {
           alert('Please Enter Name !!')
           return ;
       }
       auth.createUserWithEmailAndPassword(email,password)
       .then(function(){
           var user=auth.currentUser
           var database_ref=database.ref()
           var user_data={
               email:email,
               full_name:full_name,
               last_login:Date.now()
           }
           database_ref.child('super-users/'+user.uid).set(user_data)
           document.getElementById("InputEmail").value=null
           document.getElementById("InputPassword1").value=null
           document.getElementById("full_name").value=null
           return window.location.href='update.html';
       })
       .catch(function(error){
           var error_code=error_code
           var error_msg=error_message
           alert(error_msg)
           document.getElementById("InputEmail").value=null
           document.getElementById("InputPassword1").value=null
           document.getElementById("full_name").value=null
       })
   }
   function login()
   {
       email=document.getElementById("email").value
       password=document.getElementById("InputPassword2").value
       if(validate_email(email)==false || validate_password(password)==false)
       {
           alert('Email or password is Wrong')
           return
       }
       auth.signInWithEmailAndPassword(email,password)
       .then(function(){
        var user=auth.currentUser
       
        var database_ref=database.ref()
        var user_data={
             
            last_login:Date.now()
        }
        // console.log(email + password)
        database_ref.child('super-users/'+user.uid).update(user_data)
        document.getElementById("email").value=null
        document.getElementById("InputPassword2").value=null
           
        return window.location.href='update.html';
        // alert('User Logged In!')
       })
       .catch(function(error){
        
           var error_code=error.error_code
           var error_message=error.message
           alert(error_message)
           document.getElementById("email").value=null
           document.getElementById("InputPassword2").value=null
       })
   }
   
   function validate_email(email)
   {
       expression=/^[^@]+@\w+(\.\w+)+\w$/;
       if(expression.test(email)==true)
       {
           return true
       }else{
           return false
       }
   }

   function validate_password(password)
   {
       if(password<6)
       {
           return false
       }else{
           return true
       }
   }
   function vallidate_field(field )
   {
       if(field==null)
       {
           return false;
       }
       if(field.length<=0)
       {
           return false
       }else{
           return true
       }
   }