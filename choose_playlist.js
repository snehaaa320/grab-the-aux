var token = 'BQBuB9HhhduAtcBJtUBj-W3dsKGkiEAU3g8sf8OIAKXuwUOiIIDmSYZvkV5N_OXZTFXKGgIo5fvJAwsDr1P7m9ni0WoCz0TpN1rEpyYrQ6WUAnNHr-Sf-14BMnWICJxvTFBnjc1J4lQ1UgHOnQIrM9AxxMDonLjbOpK7g1pTmIdD7VMQlP6BVpx80QFK3UFN3HouzhNyOm0DwuqRTOcV2DsXo41SyDrIPRmlmk_WA9Iim3dC82zU_3Bt-fsqNu1dvB0Wmmv9x1XMukT8Lj2XAHDr0O3ofEs_HUhpbAY';
var playlistid = '2ysn3h0Vmkb4sqmCDyCgqO';
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
    console.log("Owner ID  = " + selected_playlist["owner"]["id"]);
    console.log("Playlist ID = " + selected_playlist["id"]);
    window.location.href = "user_view.html?is_guest=false&owner_id="+selected_playlist["owner"]["id"]+ "&playlist_id=" + selected_playlist["id"];
}




