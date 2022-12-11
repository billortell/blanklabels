<section class="py-5-xs">
    <div class="container px-5-xs my-5">
        <div class="row gx-5">
            <div class="col-xs-12">
                <div class="text-center mb-5">
                    <h1 class="fw-bolder">Sign Up</h1>
                    <p class=" mb-4">
                        Start taking advantage of these opportunities.
                    </p>
                </div>
                <div class="justify-content-center text-center">

                    <?php
                    if(isset($_SESSION['_flashdata'])): ?>
                        <!-- Looping All Flash messages -->
                        <?php foreach($_SESSION['_flashdata'] as $key => $val): ?>
                            <p><?php echo $val;?></p>
                        <?php endforeach; ?>
                        <!-- Looping All Flash messages -->
                    <?php endif; ?>
                    <?php unset($_SESSION['_flashdata']); ?>
                    <form class="form-floating" action="/register" method="post" accept-charset="utf-8">

                        <div class="form-floating mb-3">
                            <input type="email" class="form-control "  name="email" id="floatingInputEmail" placeholder="Email" value="">
                            <label for="floatingInputEmail">Email</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="password" class="form-control"  name="password" id="floatingInputPassword" placeholder="Password" value="">
                            <label for="floatingInputPassword">Password</label>
                        </div>

                        <!-- Submit Button-->
                        <div class="d-grid">
                            <button type="submit" id="submitButton" class="btn btn-primary btn-lg">Create Account</button>
                        </div>

                        <p class=" mt-4 mb-4">
                            Already have an account? <a href="/login">Login</a>
                        </p>


                        <input type="hidden" name="action" value="admin.createUser">


                    </form>

                </div>
            </div>
        </div>
    </div>
</section>
