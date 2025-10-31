<?php
require_once('includes/db.php');
$page_name = 'Dashboard';
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
                    <p>Recently Registered Users</p>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <?php
                    $users = $db->select('users', '*', [], [
                        'order_by' => 'id DESC',
                        'limit_by' => 5
                    ]);
                    if ($users) {
                    ?>
                        <table class="table dataTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Join Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $count = 1;
                                foreach ($users as $user) { ?>
                                    <tr>
                                        <td><?= $count; ?></td>
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
                                            <button class="no-btn-styles text-danger cp deleteData" title="Delete" data-target="user-<?php echo $user['id']; ?>" data-action="deleteUser"><i class="fas fa-trash-alt"></i> Delete</button>
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
                <div class="col-12 pull-right">
                    <a href="users">View All</a>
                </div>
            </div>
        </div>
    </div>
    <?php require_once('./includes/js.php'); ?>
</body>

</html>