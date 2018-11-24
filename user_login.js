var config = {
    apiKey: "AIzaSyDs1juHP3-F2AazMkfw-RotpRqo-4LhVWg",
    authDomain: "grabtheaux-47eb2.firebaseapp.com",
    databaseURL: "https://grabtheaux-47eb2.firebaseio.com",
    projectId: "grabtheaux-47eb2",
    storageBucket: "grabtheaux-47eb2.appspot.com",
    messagingSenderId: "23642747296"
};
var uid = null;
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        var currentUser = firebase.auth().currentUser;
        var isGuest = user.isAnonymous;
        uid = user.uid;

        if (isGuest) {
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

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });
}

// sign into guest account -> display
function anonymous_login() {
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });
}

function logout() {
    firebase.auth().signOut();
}


// This function uses the uid to save the name of the
function save_guest_name(uid) {
    var name = document.getElementById("guest_name").value;
    if (typeof uid !== "undefined") {
        firebase.database().ref('Guest_Table/' + uid).set({
            name: name
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
            guest_name = (snapshot.val().name || snapshot.val());
            redirect_page(guest_name);
        } else {
            update_view("");
        }

    });

}

function generate_url() {

    var uuid = require('node-uuid');
    // Generate a v1 (time-based) id
    var timeBasedID = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
    // Generate a v4 (random) id
    var randomID = uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
    var url = 'http://localhost:5000/' + randomID; // or + timeBasedID
    return url;

}
