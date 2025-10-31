<?php
require_once('includes/db.php');
$page_name = 'Users';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php require_once('./includes/head.php'); ?>
</head>

<body>
    <?php require_once('./includes/header.php'); ?>
    <div class="all-content">
        <div class="card">
            <div class="card-header">
                <div class="pull-away">
                    <p>Users</p>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <?php
                    $users = $db->select('users', '*', [], [
                        'order_by' => 'id DESC',
                    ]);
                    if ($users) {
                    ?>
                        <table class="table table-bordered dataTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Join Date</th>
                                    <th>Status</th>
                                    <th class="d-none"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $count = 1;
                                foreach ($users as $user) {
                                    if ($user['id'] === LOGGED_IN_USER_ID)
                                        continue; ?>
                                    <tr>
                                        <td><?php echo $count; ?></td>
                                        <td>
                                            <div class="media">
                                                <img src="../images/users/<?php echo $user['image']; ?>" alt="user-img" class="user-img small">
                                                <div class="media-body ml-2">
                                                    <p class="name text-info"><?php echo $user['name']; ?></p>
                                                    <p class="email text-muted"><?php echo $user['email']; ?></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td><?php echo monthDate($user['date_added']); ?></td>
                                        <td>
                                            <span class="text-white p-1 bold small-font <?php
                                                                                        if ($user['verify_status'] != '1') echo 'bg-warning text-dark';
                                                                                        else echo 'bg-success'; ?>">
                                                <?php
                                                if ($user['verify_status'] == '1') echo 'Verified';
                                                else echo 'unverified';
                                                ?>
                                            </span>
                                        </td>
                                        <td>
                                            <div class="align-center child-el-margin-x">
                                                <input type="checkbox" class="tc-checkbox tc-jx-element" data-submit='{"user_id": "<?= $user['id'] ?>"}' data-target="users" name="modifyUserIsAdmin" <?= $user['is_admin'] == "1" ? "checked" : "" ?>>
                                                <button class="no-btn-styles text-danger cp tc-delete-btn" title="Delete" data-target="<?= $user['id']; ?>" data-action="user"><i class="fas fa-trash-alt"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                <?php $count++;
                                } ?>
                            </tbody>
                        </table>
                    <?php
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
    <?php require_once('./includes/js.php'); ?>
</body>

</html>