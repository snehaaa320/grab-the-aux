var config = {
    apiKey: "AIzaSyDs1juHP3-F2AazMkfw-RotpRqo-4LhVWg",
    authDomain: "grabtheaux-47eb2.firebaseapp.com",
    databaseURL: "https://grabtheaux-47eb2.firebaseio.com",
    projectId: "grabtheaux-47eb2",
    storageBucket: "grabtheaux-47eb2.appspot.com",
    messagingSenderId: "23642747296"
};
var uid = null;
var is_guest = false;
var playlist_token = null;
var name = false;
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        var currentUser = firebase.auth().currentUser;
        var isGuest = user.isAnonymous;
        uid = user.uid;

        if (isGuest) {
            is_guest = true;
            get_guest_name(uid, guest_name);
        } else {
            document.getElementById("user_div").style.display = "block";
            document.getElementById("login_div").style.display = "none";
            document.getElementById("guest_div").style.display = "none";
            var email_id = currentUser.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
        }

    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        document.getElementById("guest_div").style.display = "none";
    }
});

function login() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    is_guest = false;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });
}

// sign into guest account -> display
function anonymous_login() {
    is_guest = true;
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });
}

function logout() {
    is_guest = null;
    firebase.auth().signOut();
}


// This function uses the uid to save the name of the
function save_guest_name(uid) {
    name = document.getElementById("guest_name").value;
    playlist_token = document.getElementById("playlist_token").value;
    if (typeof uid !== "undefined") {
        firebase.database().ref('Guest_Table/' + uid).set({
            name: name,
            playlist_token: playlist_token,
        });
    }
    var guest_name;
    get_guest_name(uid, guest_name);
}

function get_guest_name(uid, guest_name) {
    firebase.database().ref('Guest_Table/' + uid).once('value').then(function(snapshot) {
        if (snapshot.hasChild("name")) {
            guest_name = (snapshot.val().name || snapshot.val());
            update_view(guest_name);
        } else {
            update_view("");
        }
    });
}

function update_view(name) {
    if (name !== "") {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("guest_div").style.display = "none";
        document.getElementById("user_para").innerHTML = "Welcome User : " + name;
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("guest_div").style.display = "block";
    }
}

function join() { // Create function on 1st page

    var guest_name = "";
    firebase.database().ref('Guest_Table/' + uid).once('value').then(function(snapshot) {
        if (snapshot.hasChild("name")) {
            guest_name = snapshot.child("name").val();
            playlist_token = snapshot.child("playlist_token").val();
            redirect_page(true, guest_name);
        } else {
            update_view("");
        }
    });
}

function redirect_register_page() {
    logout();
    window.location.href = "user_register.html";
}

function register() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var error_happened = false;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        error_happened = true;
    });
    if (!error_happened) {
        window.location.href = "user_login.html"
    }
}

function redirect() {

    console.log("inside redirect");
    if (is_guest) {
        firebase.database().ref('Guest_Table/' + uid).once('value').then(function(snapshot) {
            var guest_name = "";
            guest_name = snapshot.child("name").val();
            playlist_token = snapshot.child("playlist_token").val();
            var stringQuery = "?is_guest=" + is_guest + "&user_name=" + guest_name + "&playlist_token=" + playlist_token;
            console.log(playlist_token.value);
            window.location.href = "user_view.html" + stringQuery;
        });

    } else {
        window.location.href = "choose_playlist.html"
    }
}
