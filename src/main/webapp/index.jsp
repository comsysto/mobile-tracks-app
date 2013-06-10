<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>cS AngularJS Tracks App - Sign in</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="angular/css/bootstrap.min.css" rel="stylesheet">
    <link href="angular/css/bootstrap-responsive.min.css" rel="stylesheet">
    <style type="text/css">
        body {
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #f5f5f5;
        }

        .form-signin {
            max-width: 300px;
            padding: 19px 29px 29px;
            margin: 0 auto 20px;
            background-color: #fff;
            border: 1px solid #e5e5e5;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
            -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
            box-shadow: 0 1px 2px rgba(0,0,0,.05);
        }
        .form-signin .form-signin-heading,
        .form-signin .checkbox {
            margin-bottom: 10px;
        }
        .form-signin input[type="text"],
        .form-signin input[type="password"] {
            font-size: 16px;
            height: auto;
            margin-bottom: 15px;
            padding: 7px 9px;
        }

    </style>

</head>

<body>

<div class="container">

    <form class="form-signin" action="j_spring_security_check" method="POST">
        <h2 class="form-signin-heading">Please sign in</h2>
        <input type="email" class="input-block-level" name="j_username" placeholder="Email address">
        <input type="password" class="input-block-level" name="j_password" placeholder="Password">
        <button class="btn btn-large btn-primary" type="submit">Sign in</button>
    </form>

</div>

<script src="angular/js/jquery-2.0.1.min.js"></script>
<script src="angular/js/bootstrap.min.js"></script>

</body>
</html>