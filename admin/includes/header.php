    <div class="sidebar">
        <div class="user-info text-center">
            <div class="user-image-container">
                <img src="../images/users/<?= LOGGED_IN_USER['image']; ?>" alt="user-img" class="user-img">
                <label class="overlay"><i class="fas fa-camera"></i>
                    <input type="file" class="user-img-file d-none" accept="image/*">
                </label>
            </div>
            <button class="save-img btn bg_pink"><i class="fas fa-save"></i> Save Image</button>
            <div>
                <p class="user-name" style="text-transform: capitalize;"><?= LOGGED_IN_USER['name']; ?></p>
            </div>
        </div>
        <ul class="nav">
            <li class="nav-item">
                <a href="dashboard" class="nav-link">
                    <i class="fas fa-th-large"></i>
                    <span class="text">Dashboard</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="users" class="nav-link">
                    <i class="fas fa-users"></i>
                    <span class="text">Users</span>
                </a>
            </li>
            <!-- Templates -->
            <li class="nav-item with-sub-menu">
                <a href="#" class="nav-link pull-away">
                    <span>
                        <i class="fas fa-th-list"></i>
                        <span class="text">Templates</span>
                    </span>
                    <i class="fas fa-angle-down"></i>
                </a>
                <ul class="sub-menu">
                    <li class="nav-item">
                        <a href="templates" class="nav-link">
                            <span class="text">All Templates</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="categories?type=public_templates" class="nav-link">
                            <span class="text">Categories</span>
                        </a>
                    </li>
                </ul>
            </li>
            <!-- Shapes -->
            <li class="nav-item with-sub-menu">
                <a href="#" class="nav-link">
                    <span>
                        <i class="fas fa-shapes"></i>
                        <span class="text">Shapes</span>
                    </span>
                    <i class="fas fa-angle-down"></i>
                </a>
                <ul class="sub-menu">
                    <li class="nav-item">
                        <a href="shapes" class="nav-link">
                            <span class="text">All Shapes</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="categories?type=shapes" class="nav-link">
                            <span class="text">Categories</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <a href="editor-fonts" class="nav-link">
                    <i class="fas fa-shapes"></i>
                    <span class="text">Editor Fonts</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="<?= _DIR_ ?>user/setting" class="nav-link" target="_blank">
                    <i class="fas fa-cog"></i>
                    <span class="text">Profile Setting
                        <i class="fas fa-external-link-alt ml-1" style="font-size: 13px"></i>
                    </span>
                </a>
            </li>
        </ul>
    </div>
    <nav class="navbar">
        <a class="logo page-name" href="dashboard">
            Admin Dashboard
        </a>
        <div class="menu">
            <div class="dropdown">
                <button class="dropdown-toggle menu-item no-arrow-icon" type="button" data-toggle="dropdown">
                    <img src="../images/users/<?= LOGGED_IN_USER['image']; ?>" alt="user-img" class="user-img">
                </button>
                <div class="dropdown-menu">
                    <a href="<?= _DIR_ ?>logout" class="dropdown-item"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        </div>
    </nav>