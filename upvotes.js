window.onload = function() {

    Vue.component('post', {
        template: "#post-template",
        props: ['post'],
        data: function() {
            return {
                upvoted: false,
                downvoted: false
            };
        },
        methods: {
            upvote: function() {
                this.upvoted = !this.upvoted;
                this.downvoted = false;
            },
            downvote: function() {
                this.downvoted = !this.downvoted;
                this.upvoted = false;
            }
        },
        computed: {
            votes: function() {
                if (this.upvoted) {
                    votes_to_db(this.post.votes + 1);
                    return this.post.votes + 1;
                } else if (this.downvoted) {
                    return this.post.votes - 1;
                } else {
                    return this.post.votes;
                }
            }
        }
    });

    var vm = new Vue({
        el: "#app",
        data: {
            posts: [{
                votes: 0
            }]
        }
    });


}
