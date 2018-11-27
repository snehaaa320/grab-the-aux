var token = 'BQDI8BFThLtd0TnEKaZHV3E2z4gGMx_dXEu3sdwoEgELKKJwayCn_551f8Q-iHlbWkbtf1U_2iGkaAAtoZayjNDnfSBcNv0OvVmoOYB89VU0EUvUBiZSOg5eBP9yD8iTU5YE8CDLOD7YtsC5nionIwn9V-Rt7wZ-7KP9JWlUdhHEuYm-QEckAOF1dvBx3H4yXXXZtdvua5W5MSc3jsd1Yx-4Qr3t-y9DgWW5op6l0qZBAQubBUGiuGfj1Ld_aY_iCh2-6HDCqiZ_0CjsoGa7493avQDAGBPFPrLCCtwo';
var playlistid = '2ysn3h0Vmkb4sqmCDyCgqO';
var user_uri ='22wzuycdg3qep6pwszio7pizi';
//var token = get_access_token();
//var user_uri = get_user_uri();

var song = [];
var playlists = [];
var map = {};
var selected_playlist;

function getUserPlaylists() {

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    spotifyApi.getUserPlaylists() // note that we don't pass a user id
        .then(function(data) {
            console.log('User playlists', data);
            console.log(data["items"][0]["name"]);
            for (var i = 0; i < 5; i++) {
                //playlists stores the uri of each playlist
                playlists.push(data["items"][i]);

                //this is a map of the uri of the playlist to the name of the playlist
                map[playlists[i]] = data["items"][i]["name"];

                var p = "playlist" + i;
                document.getElementById(p).innerHTML = map[playlists[i]];
                console.log(playlists[i]);
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
    redirect_to_user_view(selected_playlist)
    return selected_playlist;
}

function redirect_to_user_view(selected_playlist) {
    console.log("Owner ID  = " + selected_playlist["owner"]["id"]);
    console.log("Playlist ID = " + selected_playlist["id"]);
    window.location.href = "user_view.html?is_guest=false&owner_id="+selected_playlist["owner"]["id"]+ "&playlist_id=" + selected_playlist["id"];
}
