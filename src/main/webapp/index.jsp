<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    <title>cS Mobile Tracks App</title>
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.css" />
    <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js"></script>
</head>
<body>
<div data-role="page" id="home" style="width:100%; height:100%;">
    <div data-role="header" data-position="fixed"><h2>cS Mobile Tracks Login</h2></div>

    <div data-role="content" class="ui-content" role="main" style="width:100%; height:100%; padding:0;">
        <div class="content-primary">
            <form action="j_spring_security_check" method="POST" data-ajax="false">
                <label for="user" class="ui-hidden-accessible">Username:</label>
                <input type="email" name="j_username" id="user" value="" placeholder="Username"/>
                <label for="pwd" class="ui-hidden-accessible">Username:</label>
                <input type="password" name="j_password" id="pwd" value="" placeholder="Password"/>
                <div class="ui-body ui-body-b">
                    <fieldset class="ui-grid-a">
                        <div class="ui-block-b">
                            <button data-theme="a" type="submit" class="ui-btn-hidden" aria-disabled="false">Submit</button>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>