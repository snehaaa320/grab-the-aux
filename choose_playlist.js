var token = 'BQBnh6DcQ12d3x7I-MR21YUqxFkBPLdtpCHwU15wLSuwOod_tN9i5VddTl3vI3upi8u2wjrouv4dbwu6rT2khijJWVUHdzsbWH4uppJtnjvbD-Ve-ttsPScXGun6Pu2q-rsPZUV4Ijlmqoc_UzEEejWd09LUzOgyB20_k43Xe3vi5eMHirDwIwUtWVwA2cAILGzLEtEVmuk9C2Fg9OhMWi-bLXkAnojCS2fi6Al50iuLCLbJdUnCmBYlvRODjauI4oFNBd318R2nqesY3GF7-cMZuuRIodgJOKjZrB8';
var user_uri = '22wzuycdg3qep6pwszio7pizi';
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

                //push the url of cover if there is a cover, else push default (hello by adele)
                if (data["items"][i]["images"][0] != null) {
                    images.push(data["items"][i]["images"][0]["url"]);
                } else {
                    images.push("https://i.scdn.co/image/602102500b9cebde7559a5f9c16daaaef2846440");
                }

                //this is a map of the uri of the playlist to the name of the playlist
                map[playlists[i]] = data["items"][i]["name"];

                var p = "playlist" + i;
                var image = "image" + i;

                document.getElementById(p).innerHTML = map[playlists[i]];
                document.getElementById(image).innerHTML = '<img width="200" height="200" src=' + images[i] + '>';

                console.log;
            }

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
    window.location.href = "user_view.html?is_guest=false&name=" + selected_playlist["owner"]["display_name"] + "&user_uri=" + selected_playlist["owner"]["id"] + "&playlist_id=" + selected_playlist["id"] + "&token=" + token;
}
