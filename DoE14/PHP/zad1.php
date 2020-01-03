<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
        $conn = mysqli_connect('localhost','root','132','ogloszenia');
        $sql = 'select id, tytul, tresc from ogloszenie where kategoria like 1';
        $result = mysqli_query($conn,$sql);

        if(mysqli_num_rows($result) > 0) {
            while($row=mysqli_fetch_array($result)) {
                echo $row[0];
                echo "<br/>";
            }
        }
    ?>
</body>
</html>