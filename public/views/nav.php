<!-- Navigation-->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container px-5-xs">
        <a class="navbar-brand" href="/"><img src="/assets/images/oval-sm.svg" width="32px" alt="site-logo">  <?php echo wordwrap($sitename,5);?></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target   ="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <?php if ($auth->isLoggedIn()) : ?>
                    <li class="nav-item"><a class="nav-link text-white" href="/labels">Estimator</a></li>
                <?php endif; ?>


                <?php if (false) : ?>
                <?php if ($auth->isLoggedIn()) : ?>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Profile</a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                            <li><a class="dropdown-item" href="/change-email">Change Email</a></li>
                            <li><a class="dropdown-item" href="/change-password">Change Password</a></li>
                            <li><a class="dropdown-item" href="/logout">Logout</a></li>
                        </ul>
                    </li>

                <?php else : ?>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Login</a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                            <li><a class="dropdown-item" href="/register">Sign Up</a></li>
                            <li><a class="dropdown-item" href="/login">Login</a></li>
                        </ul>
                    </li>

                <?php endif; ?>
                <?php endif; ?>

            </ul>
        </div>
    </div>
</nav>
<!-- Navigation (ends)-->
