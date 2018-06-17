const view = (html) => (
`<!doctype html>
<html lang="en">
<head>
  <!-- Meta -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
</head>
<body>  
  ${ html }
</body>
</html>`
)

export default view
