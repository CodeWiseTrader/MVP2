fetch("/voices")
  .then((response) => response.json())
  .then((data) => {
    const app = new Vue({
      el: "#app",
      data: {
        voices: data,
      },
      methods: {
        vote: function (voiceId, voteType) {
          fetch(`/vote/${voiceId}/${voteType}`, { method: "POST" })
            .then((response) => {
              return response.ok
                ? fetch("/voices").then((response) => response.json())
                : null;
            })
            .then((data) => {
              if (data) {
                this.voices = data;
              }
            });
        },
      },
    });
  });
