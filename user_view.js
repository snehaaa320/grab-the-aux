// Initialize Firebase
var config = {
    apiKey: "AIzaSyDs1juHP3-F2AazMkfw-RotpRqo-4LhVWg",
    authDomain: "grabtheaux-47eb2.firebaseapp.com",
    databaseURL: "https://grabtheaux-47eb2.firebaseio.com",
    projectId: "grabtheaux-47eb2",
    storageBucket: "grabtheaux-47eb2.appspot.com",
    messagingSenderId: "23642747296"
};
firebase.initializeApp(config);
var previously_voted = {};
var num_of_songs = 0;

firebase.database().ref("/").child('.info/connected').on('value', function(connectedSnap) {
    if (connectedSnap.val() === true) {
        console.log("Connected to Firebase");
        getValuesFromDB();
    } else {
        console.log("Not Connected to Firebase");
    }
});

function getValuesFromDB() {
    var queueRef = firebase.database().ref('Playlist/temp_playlist/Queue/').orderByChild('queue_num');
    queueRef.on('value', function(queue) {
        num_of_songs = queue.numChildren() + 1;
        console.log(num_of_songs);
        queue.forEach(function(song) {
            printToTable(song.child('queue_num').val(), song.key, song.child('Artist').val(), song.child('Upvotes').val());
        });
    }, function(error) {
        console.log("Error : " + error.code);
    });
}

function printToTable(queue_num, song_name, song_artist, currentVote) {
    console.log(song_name + ' ' + song_artist + ' ' + currentVote);
    var table = document.getElementById('song_table');
    if (table.rows.length == num_of_songs) {
        table.deleteRow(1);
    }
    var new_row = table.insertRow(-1);
    var queue_cell = new_row.insertCell(0);
    var song_name_cell = new_row.insertCell(1);
    var song_artist_cell = new_row.insertCell(2);
    var upvotes = new_row.insertCell(3);
    var played_button = new_row.insertCell(4);
    queue_cell.innerHTML = queue_num;
    song_name_cell.innerHTML = song_name;
    song_artist_cell.innerHTML = song_artist;
    upvotes.innerHTML = '<img src="upvote.png" alt="Up Vote" height="20px" onclick="update_vote_count(\'' + song_name + '\',' + (currentVote + 1) + ', 1)"/> &nbsp;' + currentVote;
    upvotes.innerHTML += '&nbsp;&nbsp;<img src="downvote.png" alt="Down Vote" height="20px" onclick="update_vote_count(\'' + song_name + '\',' + (currentVote - 1) + ', 0)" />';
    played_button.innerHTML = '<button type="submit" name="song_played" onclick="removeSong(' + queue_num + ',\'' + song_name + '\',\'' + song_artist + '\');">Song was Played</button>';
}

function writeToDB() {
    var song_name = document.getElementById("song_name").value;
    window.location.href = 'upvotes.html' + '#' + song_name;

    var song_artist = document.getElementById("song_artist").value;
    firebase.database().ref('Playlist/temp_playlist/Queue/' + song_name).set({
        Artist: song_artist,
        Upvotes: 0,
        queue_num: num_of_songs,
    });

}

function update_vote_count(song_name, new_vote, upvote) {
    // make sure you keep track of the songs which user already voted on
    if (previously_voted[song_name + upvote] == true)
        return;

    var update = {};
    // for downvotes
    if (upvote == 0) {
        previously_voted[song_name + upvote] = true;
        var temp_variable = 1;
        if (previously_voted[song_name + temp_variable]) {
            previously_voted[song_name + temp_variable] = false;
            new_vote = new_vote - 1;
        }

        update['Playlist/temp_playlist/Queue/' + song_name + '/Upvotes'] = new_vote;
    }
    if (upvote == 1) {
        previously_voted[song_name + upvote] = true;
        var temp_variable = 0;
        if (previously_voted[song_name + temp_variable]) {
            previously_voted[song_name + temp_variable] = false;
            new_vote = new_vote + 1;
        }
        update['Playlist/temp_playlist/Queue/' + song_name + '/Upvotes'] = new_vote;
    }

    return firebase.database().ref().update(update);
}

function removeSong(queue_num, song_name, song_artist) {
    console.log(queue_num + "\n" + song_name + "\n" + song_artist);
    var update = {};

    var temp_queue_num = 1;

    var table = document.getElementById('song_table');
    var num_rows = table.rows.length - 1;
    while (table.rows.length > 1) {
        console.log(table.rows.length);
        console.log("Inside while loop");
        if (table.rows[1].cells[0].innerHTML != queue_num) {
            update['Playlist/temp_playlist/Queue/' + table.rows[1].cells[1].innerHTML + '/queue_num'] = temp_queue_num++;
        }
        table.deleteRow(1);
    }
    console.log(num_of_songs);
    num_of_songs--;
    console.log(num_of_songs);
    update['Playlist/temp_playlist/Queue/' + song_name + '/'] = null;
    return firebase.database().ref().update(update);

}
