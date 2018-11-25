var token = 'BQCupsvY9ePrKfWnl_NEYjlFbOYP6MnyMWE5qCjcyuNRcDfz2uvEHuaIbSJLkk3q8C6umRKg5Emh5U8bF_EgM-vsocJWXQEIYDB7Jw9NJ5TWs3wUXD9gzKFUdOaxI-FZTEKwoTb_kvpmP7POClWoRYeE5m_YReVVcwHDw17gJl6ygF0UO8t997BKXywbELdGpDLjyM2K1d4YdqBEnU0VNuCe644h2Ruq1TKNc_ycTL150ANatZEx61r50xBWzuvxgiOPLXbLkePmvGroB1hOUyEcgjMbinOnMoadPXI';
var playlistid = '2ysn3h0Vmkb4sqmCDyCgqO';
var user_uri = '22wzuycdg3qep6pwszio7pizi';
var song = []
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
