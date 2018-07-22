const view = (APP_URL, NODE_ENV, params, helmet = {}, appHtml = '', appCss = '', initialState = {}) => (
`<!doctype html>
<html lang="en">
<head>
  <!-- Meta -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#2196f3">
  ${ helmet.title.toString() }
  ${ helmet.meta.toString() }
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="${ APP_URL }/images/favicon/favicon.ico" />
  <link rel="icon" type="image/png" sizes="16x16" href="${ APP_URL }/images/favicon/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="${ APP_URL }/images/favicon/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="${ APP_URL }/images/favicon/favicon-96x96.png" />
  
  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
  <link href="https://fonts.googleapis.com/css?family=Raleway:400,600" rel="stylesheet" />
  
  <!-- CSS - Reset -->
  <style type="text/css">
    html {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }
    *, *::before, *::after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      background-color: #fff;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
  </style>
  <!-- CSS - Generated -->
  <style type="text/css">${ appCss }</style>
  <!-- CSS - Datetime -->
  <link rel="stylesheet" media="all" href="/css/datetime.css" />
</head>
<body>  
  <!-- App -->
  <div id="app">${ appHtml }</div>
  
  <!-- Initial State -->
  <script>
    window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) }
  </script>
  
  <!-- JS Bundles -->
  <script type="text/javascript" src="${ APP_URL }/js/bundles/vendor.js?v=0.1"></script>
  <script type="text/javascript" src="${ APP_URL }/js/bundles/app.js?v=${ NODE_ENV !== 'production' ? Math.random() : params.site.version }"></script>
</body>
</html>`
)

export default view
