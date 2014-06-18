(function () {
    var url = (window.serverInfo && window.serverInfo.url) || "http://127.0.0.1:3000/api/api-docs";
    window.swaggerUi = new window.SwaggerUi({
      url: url,
      dom_id: "swagger-ui-container",
      supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
      onComplete: function(swaggerApi, swaggerUi){
        console.log("Loaded SwaggerUI");

        if(typeof initOAuth == "function") {
          /*
          initOAuth({
            clientId: "your-client-id",
            realm: "your-realms",
            appName: "your-app-name"
          });
          */
        }
        $('pre code').each(function(i, e) {
          hljs.highlightBlock(e)
        });
      },
      onFailure: function(data) {
        console.log("Unable to Load SwaggerUI");
      },
      docExpansion: "none"
    });

    $('#input_apiKey').change(function() {
      var key = $('#input_apiKey')[0].value;
      console.log("key: " + key);
      if(key && key.trim() != "") {
        console.log("added key " + key);
        window.authorizations.add("key", new ApiKeyAuthorization("token", key, "query"));
      }
    });

    window.swaggerUi.load();
}());