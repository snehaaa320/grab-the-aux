var spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQAnLa0tf4Fx48VyNl8LqGxR5bZtwhZJGAXZSvSiupsuq0DOZWCaHLtHbRSFqS9iRYYzLVhiADy5ThxXN-smZn7qNKBt6CPmYmNZ0ixqgXFaACQ9vxCsQ_poA4JE-T5CXsydRv34Ykl_6ZLvL3cIUetcX20Z2o2pETIgbL1xvWIwz_eXffNBhGCUjRysSHt-UqXJhtANff89Eu2UVtkr75Qx0CHQNf0A0uM');
var d;
/*
spotifyApi.getUser('22wzuycdg3qep6pwszio7pizi')
.then(function(data) {
  console.log('User data:', data);
  console.log(data["display_name"]);
}, function(err) {
  console.error(err);
});

spotifyApi.searchTracks('chandelier')
    .then(function(data) {
      console.log('Search result:', data);
      d=data;
    }, function(err) {
      console.error(err);
    });


spotifyApi.getPlaylist('0KSroJaAykd1wEt16qfX0b')
.then(function(playlist) {
  console.log('User Playlist:', playlist);
}, function(err) {
  console.error(err);
});

spotifyApi.addTracksToPlaylist('7yeCMcSsBT7gUBM0YYp4oV', ['spotify:track:4w8niZpiMy6qz1mntFA5uM'])
.then(function(playlist) {
  console.log('Track added!', playlist);
}, function(err) {
  console.error(err);
});

spotifyApi.getUserPlaylists('22wzuycdg3qep6pwszio7pizi')
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });
