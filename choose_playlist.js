var token = 'BQBtl4smIfdxlL5Ry3qjgsLYsY3pImyPmeqI3Py4JU9Sm8WJhmDfVxmy7sylh1fzIokBPbJXH_WN9OxlSBlOK8IcZ4NJJkdA8ywpGOgU5xb7niCHihmW8RUHOXbE_6Z4SQooxUz7HIJt0bhiamp7C6vdLQWJAmox82jCxe9nFCDYrUDEETbKKL0DrtDdhO27Y2Pdb-LCo6ZSUIxpchr1eAJTUpMJAxjn3UE_bzc2aHKyIQrQ7HpzXsQfHJ6MQuBGwxunRP5wl8zr_HvazJc-2ou-wA7ytRs0lrJvprs';
var user_uri ='22wzuycdg3qep6pwszio7pizi';
var song = []
var playlists = [];
var map = {};
var selected_playlist;
var images = [];

function getUserPlaylists() {

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    spotifyApi.getUserPlaylists() // note that we don't pass a user id
        .then(function(data) {
            console.log('User playlists', data);
            document.getElementById("heading").innerHTML = "Welcome, " + data["items"][0]["owner"]["display_name"];

            console.log(data["items"][0]["name"]);
            for (var i = 0; i < 6; i++) {
                //playlists stores the uri of each playlist
                playlists.push(data["items"][i]);

                images.push(data["items"][i]["images"][0]["url"]);

                //this is a map of the uri of the playlist to the name of the playlist
                map[playlists[i]] = data["items"][i]["name"];

                var p = "playlist" + i;
                var image="image" + i;

                document.getElementById(p).innerHTML = map[playlists[i]];
                document.getElementById(image).innerHTML = '<img width="200" height="200" src='+ images[i]+'>';

                console.log(playlists[i]);
                console.log(images[i]);
                console.log;
            }

            console.log(images[0]);

        }, function(err) {
            console.error(err);
        });
}

function choosePlaylists(index) {
    selected_playlist = playlists[index];
    console.log(selected_playlist);
    redirect_to_user_view(selected_playlist);
    return (selected_playlist);
}

function create() {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    var playlist_name = prompt("Please enter a name for your playlist:", "new playlist!!");
    var name = {
        "name": playlist_name,
        "description": "New playlist description",
        "public": true
    }
    spotifyApi.createPlaylist(name)
        .then(function(new_playlist) {
            console.log('Playlist Created!', new_playlist);
            selected_playlist = new_playlist;
            console.log(selected_playlist);
        }, function(err) {
            console.error(err);
        });
    alert("Your playlist has been created. Please refresh your page!");
    redirect_to_user_view(selected_playlist);
    return selected_playlist;
}

function redirect_to_user_view(selected_playlist) {
    console.log("Owner's Name  = " + selected_playlist["owner"]["display_name"]);
    console.log("Owner ID  = " + selected_playlist["owner"]["id"]);
    console.log("Playlist ID = " + selected_playlist["id"]);
    console.log("Token  = " + token);
    window.location.href = "user_view.html?is_guest=false&name="+ selected_playlist["owner"]["display_name"] + "&user_uri="+selected_playlist["owner"]["id"]+ "&playlist_id=" + selected_playlist["id"] + "&token="+ token;
}
